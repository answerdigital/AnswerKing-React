import { ReactElement } from 'react';
import { mount } from 'cypress/react18';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';

const queryClient = new QueryClient();

const CustomMount = (component: ReactElement): void => {
  mount(
    <Router>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>{component}</HelmetProvider>
      </QueryClientProvider>
    </Router>
  );
};

export default CustomMount;
