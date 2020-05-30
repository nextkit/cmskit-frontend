import { Form, Modal, Select } from 'antd';
import React from 'react';
import languages from '../data/languages';
import { ILanguage } from '../interfaces';
import { IWebsiteStore } from '../stores/WebsiteStore';

/**
 * Add Languages Dialog
 */
interface IAddLanguagesDialogProps {
  websiteStore: IWebsiteStore;
  visible: boolean;
  loading: boolean;
  onAdd: (languages: ILanguage[]) => void;
  onCancel: () => void;
}

const AddLanguagesDialog: React.FC<IAddLanguagesDialogProps> = ({
  websiteStore,
  visible,
  loading,
  onAdd,
  onCancel,
}) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log(values);
    const result = [];
    for (const language of values.languages) {
      const split = language.split(' /');
      result.push({ language: split[0], langCountryCode: split[1] });
    }
    onAdd(result);
  };

  const convertToOption = () =>
    languages.map((x) => {
      return {
        value: x.language + ' /' + x.langCountryCode,
        disabled: websiteStore.i18n.find((t) => t.language === x.language) ? true : false,
      };
    });

  const options = convertToOption();

  return (
    <Modal
      title="Add Language"
      visible={visible}
      confirmLoading={loading}
      okText="Add"
      okType="primary"
      onOk={form.submit}
      onCancel={onCancel}>
      <Form form={form} name="add-languages-dialog" onFinish={onFinish} layout="vertical">
        <Form.Item name="languages" label="Languages" rules={[{ required: true }]}>
          <Select mode="multiple" placeholder="Select the Language to add" options={options} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddLanguagesDialog;
