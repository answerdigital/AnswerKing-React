import './Home.scss';
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
      <div className="home">
        <div className="home__message">
          The <b>Answer</b> to your cravings.
        </div>
        <Button onClick={handleClick} size="large">
          Menu
        </Button>
      </div>
    </>
  );
};
