import { Form, Input, Modal, Select, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import { ITemplateStore } from '../stores/TemplateStore';
import { UploadFile } from 'antd/lib/upload/interface';
import { createUseStyles } from 'react-jss';

/**
 * Create Page Dialog
 */
interface ICreateTemplateDialogProps {
  visible: boolean;
  templateStore: ITemplateStore;
  loading: boolean;
  onAdd: (name: string, templateFile: File) => void;
  onCancel: () => void;
}

const CreateTemplateDialog: React.FC<ICreateTemplateDialogProps> = ({
  visible,
  templateStore,
  loading,
  onAdd,
  onCancel,
}) => {
  const [templateFile, setTemplateFile] = useState<File | undefined>(undefined);
  const [form] = Form.useForm();
  const classes = useStyle();

  useEffect(() => {
    if (templateStore.firstLoad === false) {
      templateStore.load();
    }
  }, [templateStore]);

  const onFinish = (values: any) => {
    if (templateFile === undefined) {
      return;
    }
    onAdd(values.name, templateFile);
  };

  return (
    <Modal
      title="Create Template"
      visible={visible}
      confirmLoading={loading}
      okText="Create"
      okType="primary"
      onOk={form.submit}
      onCancel={onCancel}>
      <Form form={form} name="create-template-dialog" onFinish={onFinish} layout="vertical">
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="templateFile"
          label="Template"
          rules={[{ required: true }]}
          className={classes.center}>
          <Upload
            name="templateFile"
            className={classes.uploader}
            listType="picture-card"
            showUploadList={false}
            beforeUpload={(file) => {
              setTemplateFile(file);
              return false;
            }}>
            {templateFile ? (
              <div className="ant-upload-text">{templateFile.name}</div>
            ) : (
              <div className="ant-upload-text">Select Template File</div>
            )}
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

const useStyle = createUseStyles({
  center: {
    textAlign: 'center',
  },
  uploader: {
    width: 'auto',
  },
});

export default CreateTemplateDialog;
