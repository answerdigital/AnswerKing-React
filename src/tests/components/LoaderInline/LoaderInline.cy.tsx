import { LoaderInline } from 'components/LoaderInline/LoaderInline';
import CustomMount from 'tests/testHelpers/cypressHelpers/CustomMount';

describe('Inline loader', () => {
  beforeEach(() => {
    CustomMount(<LoaderInline></LoaderInline>);
  });
});
