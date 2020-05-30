import {
  BarsOutlined,
  FileTextOutlined,
  UserOutlined,
  SettingOutlined,
  GlobalOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { ClickParam } from 'antd/lib/menu';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const SideBar: React.FC = () => {
  const [selectedKey, setSelectedKey] = useState<string>('');
  const history = useHistory();

  useEffect(() => setSelectedKey(history.location.pathname.split('/')[1]), [
    setSelectedKey,
    history,
  ]);

  const onNavigation = (param: ClickParam) => {
    history.push(`/${param.key}`);
    setSelectedKey(param.key);
  };

  return (
    <Layout.Sider
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
      }}
      theme="light">
      <Menu theme="light" mode="inline" onClick={onNavigation} selectedKeys={[selectedKey]}>
        <Menu.Item key="pages" icon={<BarsOutlined />}>
          Pages
        </Menu.Item>
        <Menu.Item key="templates" icon={<FileTextOutlined />}>
          Templates
        </Menu.Item>
        <Menu.Item key="website" icon={<GlobalOutlined />}>
          Website
        </Menu.Item>
        {/* <Menu.Item key="users" icon={<UserOutlined />}>
          Users
        </Menu.Item> */}
      </Menu>
    </Layout.Sider>
  );
};

export default SideBar;
