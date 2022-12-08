import CustomMount from '../../testHelpers/cypressHelpers/CustomMount';
import { MenuPage } from './Menu';

describe('Menu Page Tests', () => {
  it('mounts', () => {
    CustomMount(<MenuPage />);
  });
});
