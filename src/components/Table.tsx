import { Table as AntTable, Button, Modal, Form } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React from 'react';
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { EditableCell, EditableRow } from './Table/EditableTableElements';

interface IProps {
  columns: ColumnsType<any>;
  dataSource: any[];
  loading?: boolean;
  editable?: boolean;
  onDelete?: (id: number) => void;
  confirmDeleteText?: string;
  confirmDeleteObjectKey?: string;
}

const Table: React.FC<IProps> = ({
  columns,
  dataSource,
  loading = false,
  onDelete,
  editable = false,
  confirmDeleteText,
  confirmDeleteObjectKey,
}) => {
  const onDeletePressed = (id: number) => {
    if (confirmDeleteText && confirmDeleteObjectKey)
      Modal.confirm({
        title: `Are you sure you want to delete ${confirmDeleteText}${
          dataSource.find((x) => x.id === id)[confirmDeleteObjectKey]
        }?`,
        icon: <ExclamationCircleOutlined />,
        okText: 'Yes',
        okButtonProps: { danger: true },
        okType: 'default',
        cancelText: 'No',
        onOk: () => {
          if (onDelete) onDelete(id);
        },
      });
  };

  return (
    <AntTable
      columns={[
        ...columns,
        {
          title: 'Actions',
          dataIndex: 'id',
          align: 'right',
          key: 'id',
          render: (id: number) => (
            <Button
              shape="circle"
              danger
              icon={<DeleteOutlined />}
              onClick={() => onDeletePressed(id)}
            />
          ),
        },
      ]}
      components={editable ? { body: { cell: EditableCell, row: EditableRow } } : {}}
      dataSource={dataSource}
      loading={loading}
      pagination={false}
    />
  );
};

export default Table;
