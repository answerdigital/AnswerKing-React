import { MenuPage } from 'pages/Menu/Menu';
import CustomMount from '../../testHelpers/cypressHelpers/CustomMount';

describe('Menu Page Tests', () => {
  it('mounts', () => {
    CustomMount(<MenuPage />);
  });
});
