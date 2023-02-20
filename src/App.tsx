import { ReactElement } from 'react';
import Layout from 'common/Layout/Layout';
import { AnimatePresence } from 'framer-motion';
import CheckoutPage from 'pages/Checkout/Checkout';
import HomePage from 'pages/Home/Home';
import MenuPage from 'pages/Menu/Menu';
import StaffPage from 'pages/Staff/Staff';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Route, Routes, useLocation } from 'react-router-dom';
import PageRoutes from 'utilities/Constants/PageRoutes';
import { LocalOrderProvider } from './context/OrderContext';
import AllergensPage from './pages/Allergens/Allergens';

const queryClient = new QueryClient();

export default function App(): ReactElement {
  const location = useLocation();
  return (
    <QueryClientProvider client={queryClient}>
      <LocalOrderProvider>
        <HelmetProvider>
          <Layout>
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route element={<MenuPage />} path={PageRoutes.MENU} />
                <Route element={<StaffPage />} path={PageRoutes.STAFF} />
                <Route element={<HomePage />} path={PageRoutes.HOME} />
                <Route element={<CheckoutPage />} path={PageRoutes.CHECKOUT} />
                <Route element={<AllergensPage />} path={PageRoutes.ALLERGEN_BOARD} />
              </Routes>
            </AnimatePresence>
          </Layout>
        </HelmetProvider>
      </LocalOrderProvider>
    </QueryClientProvider>
  );
}
