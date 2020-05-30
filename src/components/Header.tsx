import React from 'react';
import { Layout, Typography, PageHeader, Button, Skeleton } from 'antd';
import { PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

interface IProp {
  children?: string;
  subtitle?: string;
  onAdd?: () => void;
  onReload?: () => void;
  goBackTo?: string;
}

const Header: React.FC<IProp> = ({ children, subtitle, onAdd, onReload, goBackTo }) => {
  const history = useHistory();

  const goBack = () => {
    history.push(goBackTo ? goBackTo : '/');
  };

  return (
    <PageHeader
      ghost={false}
      title={children ? children : <Skeleton.Input active={true} style={{ width: 300 }} />}
      subTitle={subtitle}
      onBack={goBackTo ? goBack : undefined}
      extra={[
        onReload ? (
          <Button shape="circle" icon={<ReloadOutlined />} type="default" onClick={onReload} />
        ) : undefined,
        onAdd ? (
          <Button shape="circle" icon={<PlusOutlined />} type="primary" onClick={onAdd} />
        ) : undefined,
      ]}
    />
  );
};

export default Header;
