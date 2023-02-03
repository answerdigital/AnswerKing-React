import CustomMount from '../../testHelpers/cypressHelpers/CustomMount';
import {ToastWrapper} from './ToastWrapper';

describe('Toast Wrapper', () => {
  beforeEach(() => {
    CustomMount(
      <ToastWrapper></ToastWrapper>
    );
  });
});
