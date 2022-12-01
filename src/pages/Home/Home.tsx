import { Button } from 'components/Button/Button';
import { ReactElement } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { RouteConstants } from 'utilities/route-constants';

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
      <div className="flex flex-col justify-center items-center h-full w-full">
        <div className="pb-2.5 text-[#FFC600] text-[32px] m-[16px] text-center">
          The <b>Answer</b> to your cravings.
        </div>
        <Button onClick={handleClick} size="large">
          Menu
        </Button>
      </div>
    </>
  );
};

export default HomePage;
