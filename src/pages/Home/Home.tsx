import { ReactElement } from 'react';
import BurgerHome from 'assets/burgerhome.png';
import Logo from 'assets/icon_a.svg';
import Button from 'common/Buttons/Button';
import PageLayout from 'common/PageLayout/PageLayout';
import { useNavigate } from 'react-router-dom';
import PageRoutes from 'utilities/Constants/PageRoutes';
import Footer from './components/Footer/Footer';

export default function HomePage(): ReactElement {
  const navigate = useNavigate();

  const handleClick = (): void => {
    navigate(PageRoutes.MENU);
  };

  return (
    <PageLayout title="Home - Answer King">
      <div className="grid grid-cols-2">
        <div className="ml-[22%] flex flex-col items-center justify-center">
          <div className="mb-12 text-center text-[80px] text-white">
            <h3 className="font-poly italic leading-tight">
              The
              <img src={Logo} alt="logo" className="ml-5 mb-5 inline-block h-14" />
              <span className="font-poppins not-italic">nswer</span> to <br /> <span>your cravings</span>
            </h3>
          </div>
          <Button onClick={handleClick} colour="yellow" className="px-[50px] py-[12px] text-xl font-semibold">
            Order Now
          </Button>
        </div>
        <div className="ml-[5%]">
          <img className="mt-[3.5%] h-[85%]" alt="burger-home" src={BurgerHome} />
        </div>
      </div>
      <Footer />
    </PageLayout>
  );
}
