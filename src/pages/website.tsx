import { Card, Checkbox, Modal, Tabs } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Header, Table } from '../components';
import { useEditableTableStyles } from '../components/Table/EditableTableElements';
import { AddLanguagesDialog, AddVariableDialog } from '../dialogs';
import { ILanguage, IVariable } from '../interfaces';
import { StoreContext } from '../stores/context';
import { IWebsiteStore } from '../stores/WebsiteStore';

const Languages: React.FC<{ websiteStore: IWebsiteStore }> = ({ websiteStore }) => {
  const [showAddLanguage, setShowAddLanguage] = useState(false);
  const [loading, setLoading] = useState(false);
  const columns = [
    {
      title: 'Language',
      dataIndex: 'language',
      key: 'language',
    },
    {
      title: 'URI Prefix',
      dataIndex: 'langCountryCode',
      key: 'langCountryCode',
    },
    {
      title: 'Default',
      dataIndex: 'id',
      key: 'defaultLang',
      render: (id: number) => {
        const item = websiteStore.i18n.find((x) => x.id === id);
        if (item === undefined) {
          return <></>;
        }
        return <Checkbox checked={item.defaultLang} onChange={() => onDefaultChanged(item)} />;
      },
    },
  ];

  useEffect(() => {
    if (websiteStore.loadedI18N === false) {
      setLoading(true);
      websiteStore.loadI18N().finally(() => setLoading(false));
    }
  }, [websiteStore]);

  const onDefaultChanged = (item: ILanguage) => {
    if (item.defaultLang === true) {
      return;
    }

    Modal.confirm({
      title: `Do you want to set ${item.language} as your default language?`,
      okText: 'Yes',
      cancelText: 'No',
      onOk: () => {
        if (item.id === undefined) {
          return;
        }
        setLoading(true);
        websiteStore.setDefaultI18N(item.id).finally(() => setLoading(false));
      },
    });
  };

  const onDelete = (id: number) => {
    setLoading(true);
    websiteStore.removeI18N(id).finally(() => {
      setLoading(false);
    });
  };

  const onAdd = (languages: ILanguage[]) => {
    setLoading(true);
    websiteStore.addI18N(languages).finally(() => {
      setShowAddLanguage(false);
      setLoading(false);
    });
  };

  const onLoad = () => {
    setLoading(true);
    websiteStore.loadI18N().finally(() => setLoading(false));
  };

  return (
    <>
      <Header onAdd={() => setShowAddLanguage(true)} onReload={onLoad}>
        Languages
      </Header>
      <Table
        columns={columns}
        dataSource={websiteStore.i18n}
        loading={loading}
        onDelete={onDelete}
        confirmDeleteText="the Language "
        confirmDeleteObjectKey="language"
      />
      <AddLanguagesDialog
        websiteStore={websiteStore}
        visible={showAddLanguage}
        onCancel={() => setShowAddLanguage(false)}
        loading={loading}
        onAdd={onAdd}
      />
    </>
  );
};

const GlobalContent: React.FC<{ websiteStore: IWebsiteStore }> = ({ websiteStore }) => {
  const [showAddVariable, setShowAddVariable] = useState(false);
  const [loading, setLoading] = useState(false);
  const classes = useEditableTableStyles();
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Key',
      dataIndex: 'key',
      key: 'key',
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

  useEffect(() => {
    if (websiteStore.loadedGlobalVariables === false) {
      setLoading(true);
      websiteStore.loadVariables().finally(() => setLoading(false));
    }
  }, [websiteStore]);

  const onDelete = (id: number) => {
    setLoading(true);
    websiteStore.removeVariable(id).finally(() => {
      setLoading(false);
    });
  };

  const onAdd = (variable: IVariable) => {
    setLoading(true);
    websiteStore.addVariable(variable).finally(() => {
      setShowAddVariable(false);
      setLoading(false);
    });
  };

  const onUpdate = (variable: IVariable) => {
    setLoading(true);
    websiteStore.updateVariable(variable).finally(() => {
      setLoading(false);
    });
  };

  const onLoad = () => {
    setLoading(true);
    websiteStore.loadVariables().finally(() => setLoading(false));
  };

  return (
    <>
      <Header onAdd={() => setShowAddVariable(true)} onReload={onLoad}>
        Global Content
      </Header>
      <Table
        editable={true}
        columns={columns}
        dataSource={websiteStore.globalVariables}
        loading={loading}
        onDelete={onDelete}
        confirmDeleteText="the variable with name "
        confirmDeleteObjectKey="name"
      />
      <AddVariableDialog
        websiteStore={websiteStore}
        visible={showAddVariable}
        onCancel={() => setShowAddVariable(false)}
        loading={loading}
        onAdd={onAdd}
      />
    </>
  );
};

const Website: React.FC = observer(() => {
  const { websiteStore } = useContext(StoreContext);

  return (
    <>
      <Header>Website Settings</Header>
      <Card bordered={false}>
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="Global Content" key="1">
            <GlobalContent websiteStore={websiteStore} />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Languages" key="2">
            <Languages websiteStore={websiteStore} />
          </Tabs.TabPane>
        </Tabs>
      </Card>
    </>
  );
});

export default Website;
