import { ReactElement } from 'react';
import AnswerLogo from 'assets/logo.png';
import { Button } from 'components/Buttons/Button';
import { RouteConstants } from 'utilities/route-constants';
import { useLocation, useNavigate } from 'react-router-dom';
import cn from 'classnames';

export const Navigation = (): ReactElement => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="bg-ak-grey-2 p-5">
      <div data-testid="navigation" className="container mx-auto flex flex-wrap items-center justify-between">
        <a data-testid="home-button" href="/" className="ml-16">
          <img src={AnswerLogo} className="h-[60.18px] w-[170px]"></img>
        </a>

        <div className="mr-16 flex flex-row items-center gap-[10px] md:order-2">
          <Button
            colour="clear"
            onClick={() => navigate(RouteConstants.MENU)}
            className={cn('font-poly h-[32px] px-[20px] italic', location.pathname == '/menu' && 'text-ak-yellow')}
            hover={false}
          >
            Menu
          </Button>
          <Button
            colour="clear"
            data-testid="allergen-board-btn"
            onClick={() => navigate(RouteConstants.ALLERGEN_BOARD)}
            className={cn('font-poly h-[32px] px-[20px] italic', location.pathname == '/allergens' && 'text-ak-yellow')}
            hover={false}
          >
            Allergy Info
          </Button>
          <Button colour="clear" onClick={() => console.log(location.pathname)} className="font-poly h-[32px] px-[20px] italic" hover={false}>
            Store Info
          </Button>
          <Button data-testid="login-button" colour="clear" className="font-poly border-ak-grey-6 h-[32px] border px-[20px] italic" hover={false}>
            Log In
          </Button>
        </div>
      </div>
    </nav>
  );
};
