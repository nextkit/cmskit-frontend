import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Header, Table } from '../../components';
import config from '../../config';
import { CreatePageDialog } from '../../dialogs';
import { ITemplate } from '../../interfaces';
import { StoreContext } from '../../stores/context';

const columns = [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    render: (title: string) => (
      <Link to={`/pages/${title}`} key={`/pages/${title}`}>
        {title}
      </Link>
    ),
  },
  {
    title: 'URI',
    dataIndex: 'uri',
    key: 'uri',
    render: (uri: string) => (
      <a href={`${config.baseUrl}${uri}`} target="_blank" rel="noopener noreferrer" key={uri}>
        {uri}
      </a>
    ),
  },
  {
    title: 'Template',
    dataIndex: 'template',
    key: 'template',
    render: (template: ITemplate) => template.name,
  },
];

const Pages: React.FC = observer(() => {
  const [loading, setLoading] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const history = useHistory();

  const { pageStore, templateStore } = useContext(StoreContext);

  useEffect(() => {
    if (pageStore.firstLoad === false) {
      setLoading(true);
      pageStore.load().finally(() => setLoading(false));
    }
  }, [pageStore]);

  const onDelete = (id: number) => {
    setLoading(true);
    pageStore.remove(id).finally(() => {
      setLoading(false);
    });
  };

  const onAdd = (title: string, uri: string, template: number) => {
    setLoading(true);
    pageStore.add({ title, uri, template }).finally(() => {
      history.push(`/pages/${title}`);
    });
  };

  const onLoad = () => {
    setLoading(true);
    pageStore.load().finally(() => setLoading(false));
  };

  return (
    <>
      <Header onAdd={() => setShowCreateDialog(true)} onReload={onLoad}>
        Pages
      </Header>
      <Table
        columns={columns}
        dataSource={pageStore.pages}
        loading={loading}
        onDelete={onDelete}
        confirmDeleteText={'the page with the URI '}
        confirmDeleteObjectKey="uri"
      />
      <CreatePageDialog
        templateStore={templateStore}
        visible={showCreateDialog}
        onCancel={() => setShowCreateDialog(false)}
        onAdd={onAdd}
        loading={loading}
      />
    </>
  );
});

export default Pages;
