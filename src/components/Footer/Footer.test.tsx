import { customRender } from 'custom-render';
import Footer from 'pages/Home/components/Footer/Footer';

describe('Footer', () => {
  it('renders without crashing', () => {
    customRender(<Footer />);
  });
});
