import CustomMount from '../../testHelpers/cypressHelpers/CustomMount';
import { LoaderInline } from './LoaderInline';

describe('Inline loader', () => {
  beforeEach(() => {
    CustomMount(<LoaderInline></LoaderInline>);
  });
});
