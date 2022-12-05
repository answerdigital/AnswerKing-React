import { ReactElement } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router } from 'react-router-dom';
import { mount } from 'cypress/react';

const CustomMount = (component: ReactElement): void => {
  mount(
    <Router>
      <HelmetProvider>{component}</HelmetProvider>
    </Router>
  );
};

export default CustomMount;
