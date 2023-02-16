import { ReactElement } from 'react';
import AnswerLogo from 'assets/logo.png';
import { Button } from 'components/Buttons/Button';

export const Navigation = (): ReactElement => {
  return (
    <nav className="bg-[#5A6675] p-5">
      <div data-testid="navigation" className="container mx-auto flex flex-wrap items-center justify-between">
        <a data-testid="home-button" href="/" className="ml-16">
          <img src={AnswerLogo} className="h-[60.18px] w-[170px]"></img>
        </a>

        <div className="mr-16 flex flex-row items-center gap-x-8 md:order-2">
          <div className="text-white-base-center font-poly font-light">Contact: 07936 286319</div>
          <Button data-testid="login-button" colour="clear" className="font-poly h-[32px] w-[102px] border border-[#F7F7F7] italic" hover={false}>
            Log In
          </Button>
        </div>
      </div>
    </nav>
  );
};
