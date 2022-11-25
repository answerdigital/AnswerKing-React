import { Layout } from 'components/Layout/Layout';
import { HomePage } from 'pages/Home/Home';
import { MenuPage } from 'pages/Menu/Menu';
import { StaffPage } from 'pages/Staff/Staff';
import { CheckoutPage } from 'pages/Checkout/Checkout';
import { ReactElement } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { RouteConstants } from 'utilities/route-constants';
import { HelmetProvider } from 'react-helmet-async';
import { LocalOrderProvider } from '.../../context/OrderContext';

const queryClient = new QueryClient();

export const App = (): ReactElement => {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <LocalOrderProvider>
          <HelmetProvider>
            <Layout>
              <Routes>
                <Route element={<MenuPage />} path={RouteConstants.MENU} />
                <Route element={<StaffPage />} path={RouteConstants.STAFF} />
                <Route element={<HomePage />} path={RouteConstants.HOME} />
                <Route element={<CheckoutPage />} path={RouteConstants.CHECKOUT} />
              </Routes>
            </Layout>
          </HelmetProvider>
        </LocalOrderProvider>
      </QueryClientProvider>
    </Router>
  );
};
