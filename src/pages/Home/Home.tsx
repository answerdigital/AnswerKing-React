import { Button } from 'components/Button/Button';
import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { RouteConstants } from 'utilities/route-constants';
import BurgerHome from 'assets/burgerhome.png';
import Logo from 'assets/icon_a.svg';
import { Footer } from 'components/Footer/Footer';
import { PageLayout } from 'components/PageLayout/PageLayout';

export const HomePage = (): ReactElement => {
  const navigate = useNavigate();

  const handleClick = (): void => {
    navigate(RouteConstants.MENU);
  };

  return (
    <PageLayout title={'Home - Answer King'}>
      <div className="grid grid-cols-2">
        <div className="ml-[22%] flex flex-col items-center justify-center">
          <div className="mb-12 text-center text-[80px] text-white">
            <h3 className="font-poly italic leading-tight">
              The
              <img src={Logo} alt="logo" className="ml-5 mb-5 inline-block h-14" />
              <span className="font-poppins not-italic">nswer</span> to <br></br> <span>your cravings</span>
            </h3>
          </div>
          <Button onClick={handleClick} size="large" colour="yellow">
            Order Now
          </Button>
        </div>
        <div className="ml-[5%]">
          <img className="mt-[3.5%] h-[85%]" alt="burger-home-image" src={BurgerHome}></img>
        </div>
      </div>
      <Footer />
    </PageLayout>
  );
};
