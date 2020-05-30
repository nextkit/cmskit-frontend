import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Header, Table } from '../../components';
import CreateTemplateDialog from '../../dialogs/CreateTemplateDialog';
import { StoreContext } from '../../stores/context';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (name: string) => (
      <Link to={`/templates/${name}`} key={`/templates/${name}`}>
        {name}
      </Link>
    ),
  },
  {
    title: 'File Name',
    dataIndex: 'templateFileName',
    key: 'templateFileName',
  },
];

const Templates: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const history = useHistory();

  const { templateStore } = useContext(StoreContext);

  const onDelete = (id: number) => {
    setLoading(true);
    templateStore.remove(id).finally(() => {
      setLoading(false);
    });
  };

  const onAdd = (name: string, templateFile: File) => {
    setLoading(true);
    templateStore.add({ name, templateFile }).finally(() => {
      setLoading(false);
      history.push(`/templates/${name}`);
    });
  };

  const onLoad = () => {
    setLoading(true);
    templateStore.load().finally(() => setLoading(false));
  };

  useEffect(() => {
    if (templateStore.firstLoad === false) {
      setLoading(true);
      templateStore.load().finally(() => setLoading(false));
    }
  }, [templateStore]);

  return (
    <>
      <Header onAdd={() => setShowCreateDialog(true)} onReload={onLoad}>
        Template
      </Header>
      <Table
        columns={columns}
        dataSource={templateStore.templates}
        loading={loading}
        onDelete={onDelete}
        confirmDeleteText={'the Template '}
        confirmDeleteObjectKey="name"
      />
      <CreateTemplateDialog
        templateStore={templateStore}
        visible={showCreateDialog}
        onCancel={() => setShowCreateDialog(false)}
        onAdd={onAdd}
        loading={loading}
      />
    </>
  );
};

export default Templates;
