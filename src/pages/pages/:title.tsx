import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Header, Table } from '../../components';
import { useEditableTableStyles } from '../../components/Table/EditableTableElements';
import { IPage } from '../../interfaces';
import { StoreContext } from '../../stores/context';

const DetailedPage: React.FC = observer(() => {
  const [page, setPage] = useState<IPage | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const { title } = useParams();
  const classes = useEditableTableStyles();
  const { pageStore } = useContext(StoreContext);

  const columns = [
    {
      title: 'Key',
      dataIndex: 'key',
      key: 'key',
      width: 125,
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
      onCell: (record: any) => ({
        record,
        editable: true,
        dataIndex: 'value',
        title: 'Value',
        handleSave: onUpdate,
        className: classes.editableRow,
      }),
    },
  ];

  const onUpdate = (dataSourceRow: { key: string; value: any }) => {
    if (page === undefined || page.id === undefined || page.content === undefined) return;

    page.content[dataSourceRow.key] = dataSourceRow.value;

    setLoading(true);
    pageStore.updateContent(page.id, page.content).finally(() => {
      setLoading(false);
    });
  };

  useEffect(() => {
    pageStore.load().finally(() => {
      setPage(pageStore.pages.find((page) => page.title.toLowerCase() === title.toLowerCase()));
      setLoading(false);
    });
  }, [title, pageStore, setLoading]);

  const getDataSource = () => {
    if (page === undefined || page.content === undefined) {
      return [];
    }

    const dataSource = Object.keys(page.content).map((key) => {
      return { key, value: page.content ? page.content[key] : undefined };
    });
    return dataSource;
  };

  return (
    <>
      <Header goBackTo={'/pages'} subtitle={page ? page.uri : undefined}>
        {page ? page.title : undefined}
      </Header>

      <Header>Content</Header>
      <Table columns={columns} dataSource={getDataSource()} editable={true} loading={loading} />
    </>
  );
});

export default DetailedPage;
