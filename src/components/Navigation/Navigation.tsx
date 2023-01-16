import { ReactElement } from 'react';
import AnswerLogo from 'assets/logo.png';

export const Navigation = (): ReactElement => {
  return (
    <nav className="bg-[#5A6675] p-5">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <a href="/" className="ml-16">
          <img src={AnswerLogo} className="h-[60.18px] w-[170px]"></img>
        </a>

        <div className="mr-16 md:order-2 flex flex-row items-center gap-x-8">
          <div className="text-white-base-center font-light font-poppins">
            Contact: 07936 286319
          </div>
          <button className="rounded-[25px] bg-[#A2AAB6] py-[8px] px-[40px] text-[#333F4C] font-poppins hover:cursor-pointer">Log In</button>
        </div>
      </div>
    </nav>
  );
};
