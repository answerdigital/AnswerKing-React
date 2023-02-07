import { ReactElement } from 'react';
import AnswerLogo from 'assets/logo.png';

export const Navigation = (): ReactElement => {
  return (
    <nav className="bg-[#5A6675] p-5">
      <div data-testid="navigation" className="container mx-auto flex flex-wrap items-center justify-between">
        <a data-testid="home-button" href="/" className="ml-16">
          <img src={AnswerLogo} className="h-[60.18px] w-[170px]"></img>
        </a>

        <div className="mr-16 flex flex-row items-center gap-x-8 md:order-2">
          <div className="text-white-base-center font-poppins font-light">Contact: 07936 286319</div>
          <button
            data-testid="login-button"
            className="font-poppins rounded-[25px] bg-[#A2AAB6] py-[8px] px-[40px] text-[#333F4C] hover:cursor-pointer"
          >
            Log In
          </button>
        </div>
      </div>
    </nav>
  );
};
