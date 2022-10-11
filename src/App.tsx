import { Layout } from 'components/Layout/Layout';
import { HomePage } from 'pages/Home/Home';
import { MenuPage } from 'pages/Menu/Menu';
import { StaffPage } from 'pages/Staff/Staff';
import React, { ReactElement } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { RouteConstants } from 'utilities/route-constants';

const queryClient = new QueryClient();

export const App = (): ReactElement => {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Switch>
            <Route component={MenuPage} exact path={RouteConstants.MENU} />
            <Route component={StaffPage} exact path={RouteConstants.STAFF} />
            <Route component={HomePage} path={RouteConstants.HOME} />
          </Switch>
        </Layout>
      </QueryClientProvider>
    </Router>
  );
};
