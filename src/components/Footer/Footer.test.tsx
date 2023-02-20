import { customRender } from 'custom-render';
import Footer from './Footer';

describe('Footer', () => {
  it('renders without crashing', () => {
    customRender(<Footer />);
  });
});
