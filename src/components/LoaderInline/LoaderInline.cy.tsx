import CustomMount from '../../testHelpers/cypressHelpers/CustomMount';

import {Button} from '../Button/Button';
import {LoaderInline} from './LoaderInline';

describe('Inlineloader', () => {

  beforeEach(() => {
    CustomMount(
      <LoaderInline></LoaderInline>
    );
  });
});
