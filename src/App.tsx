import { Layout } from 'components/Layout/Layout';
import { HomePage } from 'pages/Home/Home';
import { MenuPage } from 'pages/Menu/Menu';
import { StaffPage } from 'pages/Staff/Staff';
import { ReactElement } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { RouteConstants } from 'utilities/route-constants';
import { HelmetProvider } from 'react-helmet-async';

const queryClient = new QueryClient();

export const App = (): ReactElement => {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <Layout>
            <Routes>
              <Route element={<MenuPage />} path={RouteConstants.MENU} />
              <Route element={<StaffPage />} path={RouteConstants.STAFF} />
              <Route element={<HomePage />} path={RouteConstants.HOME} />
            </Routes>
          </Layout>
        </HelmetProvider>
      </QueryClientProvider>
    </Router>
  );
};
