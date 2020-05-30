import { Table as AntTable, Button, Modal, Form, Input } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React, { useRef, useContext, useState, useEffect } from 'react';
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { FormInstance } from 'antd/lib/form';
import { createUseStyles } from 'react-jss';

const EditableContext = React.createContext<undefined | FormInstance>(undefined);

interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();

  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: string;
  record: any;
  handleSave: (record: any) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<null | any>(null);
  const form = useContext(EditableContext);

  const classes = useStyles();

  useEffect(() => {
    if (editing && inputRef != null && inputRef.current != null) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    if (form !== undefined) form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      if (form === undefined) return;
      const values = await form.validateFields();
      toggleEdit();
      if (record[dataIndex] === values[dataIndex]) return;
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  console.log(`${children}`);
  const values = Object.values(`${children}`);
  console.log(values);
  if (editable) {
    childNode = editing ? (
      <Form.Item style={{ margin: 0 }} name={dataIndex}>
        <Input.TextArea ref={inputRef} onPressEnter={save} onBlur={save} placeholder="Empty" />
      </Form.Item>
    ) : (
      <div
        className={`${classes.editableCellValueWrap}`}
        style={{ paddingRight: 24 }}
        onClick={toggleEdit}>
        {Object.values(`${children}`).length > 1 ? (
          children
        ) : (
          <span className={classes.emptyCell}>Empty</span>
        )}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

/**
 * Styles
 */
const useStyles = createUseStyles({
  editableCellValueWrap: {
    padding: '5px 12px',
    cursor: 'pointer',
  },
  emptyCell: {
    fontStyle: 'italic',
    color: 'rgba(0, 0, 0, 0.65)',
  },

  editableRow: {
    '&:hover $editableCellValueWrap': {
      border: '1px solid #d9d9d9',
      borderRadius: '4px',
      padding: '4px 11px',
    },
  },
});

export { EditableCell, EditableRow, useStyles as useEditableTableStyles };
