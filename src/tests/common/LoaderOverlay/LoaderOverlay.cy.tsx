import LoaderOverlay from 'common/LoaderOverlay/LoaderOverlay';
import CustomMount from '../../testHelpers/cypressHelpers/CustomMount';

describe('Loader Overlay', () => {
  beforeEach(() => {
    CustomMount(<LoaderOverlay isEnabled />);
  });
});
