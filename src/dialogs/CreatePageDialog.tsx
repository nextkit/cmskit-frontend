import { Form, Input, Modal, Select } from 'antd';
import React, { useEffect } from 'react';
import { ITemplateStore } from '../stores/TemplateStore';

/**
 * Create Page Dialog
 */
interface ICreatePageDialogProps {
  visible: boolean;
  templateStore: ITemplateStore;
  loading: boolean;
  onAdd: (title: string, uri: string, template: number) => void;
  onCancel: () => void;
}

const CreatePageDialog: React.FC<ICreatePageDialogProps> = ({
  visible,
  templateStore,
  loading,
  onAdd,
  onCancel,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (templateStore.firstLoad === false) {
      templateStore.load();
    }
  }, [templateStore]);

  const onFinish = (values: any) => {
    onAdd(values.title, values.uri, values.template);
  };

  return (
    <Modal
      title="Create Page"
      visible={visible}
      confirmLoading={loading}
      okText="Create"
      okType="primary"
      onOk={form.submit}
      onCancel={onCancel}>
      <Form form={form} name="create-page-dialog" onFinish={onFinish} layout="vertical">
        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="uri"
          label="URI"
          rules={[{ required: true, pattern: /^[\w~/?#[\]@!$&'()*+,;=.]+$/g }]}>
          <Input placeholder={`"/book" or "/products/display"`} />
        </Form.Item>
        <Form.Item name="template" label="Template" rules={[{ required: true }]}>
          <Select placeholder="Select a template">
            {templateStore.templates.map((template) => (
              <Select.Option value={template.id}>{template.name}</Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreatePageDialog;
