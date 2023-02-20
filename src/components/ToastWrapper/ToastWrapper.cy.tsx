import ToastWrapper from './ToastWrapper';
import CustomMount from '../../testHelpers/cypressHelpers/CustomMount';

describe('Toast Wrapper', () => {
  beforeEach(() => {
    CustomMount(<ToastWrapper />);
  });
});
