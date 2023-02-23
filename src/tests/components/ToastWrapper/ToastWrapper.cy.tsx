import { ToastWrapper } from 'components/ToastWrapper/ToastWrapper';
import CustomMount from 'tests/testHelpers/cypressHelpers/CustomMount';

describe('Toast Wrapper', () => {
  beforeEach(() => {
    CustomMount(<ToastWrapper></ToastWrapper>);
  });
});
