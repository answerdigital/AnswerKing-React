import CustomMount from '../../testHelpers/cypressHelpers/CustomMount';
import { LoaderOverlay } from './LoaderOverlay';

describe('Loader Overlay', () => {
  beforeEach(() => {
    CustomMount(<LoaderOverlay isEnabled></LoaderOverlay>);
  });
});
