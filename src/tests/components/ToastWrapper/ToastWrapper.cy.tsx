import { ToastWrapper } from 'components/ToastWrapper/ToastWrapper';
import CustomMount from '../../testHelpers/cypressHelpers/CustomMount';

describe('Toast Wrapper', () => {
  beforeEach(() => {
    CustomMount(<ToastWrapper></ToastWrapper>);
  });
});
