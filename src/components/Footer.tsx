import React from 'react';
import { Layout } from 'antd';
import { createUseStyles } from 'react-jss';

const Footer: React.FC = () => {
  const classes = useStyles();

  return (
    <Layout.Footer className={classes.container}>Ant Design ©2018 Created by Ant UED</Layout.Footer>
  );
};

/**
 * Styles
 */
const useStyles = createUseStyles({
  container: {
    textAlign: 'center',
  },
});

export default Footer;
