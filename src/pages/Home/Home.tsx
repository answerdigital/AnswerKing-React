import { Button } from 'components/Button/Button';
import { ReactElement } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { RouteConstants } from 'utilities/route-constants';
import BurgerHome from 'assets/burgerhome.png';

export const HomePage = (): ReactElement => {
  const navigate = useNavigate();

  const handleClick = (): void => {
    navigate(RouteConstants.MENU);
  };

  return (
    <>
      <Helmet>
        <title>Home - Answer King</title>
      </Helmet>
      <div className="grid grid-cols-2 gap-2">
        <div className="ml-44 mt-20 flex flex-col items-center justify-center">
          <div className="mb-10 text-center text-[80px] text-white">
            <h3 className="font-poly leading-tight">
              The Answer to <br></br> your cravings
            </h3>
          </div>
          <Button onClick={handleClick} size="large">
            Order Now
          </Button>
        </div>
        <div className="ml-20">
          <img className="mt-20 h-[600px]" alt="burger-home-image" src={BurgerHome}></img>
        </div>
      </div>
    </>
  );
};

export default HomePage;
