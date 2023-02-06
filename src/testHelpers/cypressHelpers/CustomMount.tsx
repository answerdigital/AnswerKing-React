import {ReactElement} from 'react';
import {HelmetProvider} from 'react-helmet-async';
import {BrowserRouter as Router} from 'react-router-dom';
import {mount} from 'cypress/react18';
import {QueryClient, QueryClientProvider} from 'react-query';

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
