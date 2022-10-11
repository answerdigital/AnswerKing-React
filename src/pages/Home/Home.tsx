import './Home.scss';
import { Button } from 'components/Button/Button';
import React, { ReactElement } from 'react';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import { RouteConstants } from 'utilities/route-constants';

export const HomePage = (): ReactElement => {
  const history = useHistory();

  const handleClick = (): void => {
    history.push(RouteConstants.MENU);
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
