import { MenuPage } from 'pages/Menu/Menu';
import CustomMount from 'tests/testHelpers/cypressHelpers/CustomMount';

describe('Menu Page Tests', () => {
  it('mounts', () => {
    CustomMount(<MenuPage />);
  });
});
