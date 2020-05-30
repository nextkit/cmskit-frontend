import { Form, Modal, Select, Input } from 'antd';
import React from 'react';
import languages from '../data/languages';
import { ILanguage, IVariable } from '../interfaces';
import { IWebsiteStore } from '../stores/WebsiteStore';

/**
 * Add Languages Dialog
 */
interface IAddVariableDialogProps {
  websiteStore: IWebsiteStore;
  visible: boolean;
  loading: boolean;
  onAdd: (variable: IVariable) => void;
  onCancel: () => void;
}

const AddVariableDialog: React.FC<IAddVariableDialogProps> = ({
  websiteStore,
  visible,
  loading,
  onAdd,
  onCancel,
}) => {
  const [form] = Form.useForm();

  const onFinish = (value: any) => {
    onAdd(value);
  };

  return (
    <Modal
      title="Add Variable"
      visible={visible}
      confirmLoading={loading}
      okText="Add"
      okType="primary"
      onOk={form.submit}
      onCancel={onCancel}>
      <Form form={form} name="add-variable-dialog" onFinish={onFinish} layout="vertical">
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="key" label="Key" rules={[{ required: true }]}>
          <Input placeholder={`This is the name that will be passed to the Twig engine`} />
        </Form.Item>
        <Form.Item name="value" label="Value" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddVariableDialog;
