import { ReactElement } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router } from 'react-router-dom';

const CustomMount = (component: ReactElement): void => {
  cy.mount(
    <Router>
      <HelmetProvider>{component}</HelmetProvider>
    </Router>
  );
};

export default CustomMount;
