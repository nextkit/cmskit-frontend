import { Layout } from 'antd';
import React from 'react';
import { createUseStyles } from 'react-jss';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Footer, SideBar } from './components';
import { Pages, Templates, Users, DetailedPage, Website } from './pages';
import StoreContextProvider from './stores/context';

import 'mobx-react-lite/batchingForReactDom';
import DetailedTemplate from './pages/templates/:name';

const App: React.FC = () => {
  const classes = useStyles();

  return (
    <StoreContextProvider>
      <Layout className={classes.container}>
        <Router>
          <SideBar />
          <Layout className={classes.fixedSide}>
            <Layout.Content className={classes.content}>
              <Switch>
                <Route exact path="/">
                  <Redirect to="/pages" />
                </Route>
                <Route path="/pages" exact>
                  <Pages />
                </Route>
                <Route path="/pages/:title">
                  <DetailedPage />
                </Route>
                <Route path="/templates" exact>
                  <Templates />
                </Route>
                <Route path="/templates/:name">
                  <DetailedTemplate />
                </Route>
                <Route path="/website" exact>
                  <Website />
                </Route>
                <Route path="/users">
                  <Users />
                </Route>
              </Switch>
            </Layout.Content>
            <Footer />
          </Layout>
        </Router>
      </Layout>
    </StoreContextProvider>
  );
};

/**
 * Styles
 */
const useStyles = createUseStyles({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  fixedSide: {
    background: '#f0f2f5',
    marginLeft: 200,
    padding: [0, 16, 0, 16],
  },
  content: {
    overflow: 'initial',
    minHeight: 'auto',
  },
});

export default App;
