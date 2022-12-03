import { ReactElement } from 'react';
import AnswerLogo from 'assets/logo.png';

export const Navigation = (): ReactElement => {
  return (
    <nav className="bg-[#5A6675] p-5">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <a href="/" className="ml-16">
          <img src={AnswerLogo} className="h-[60.18px] w-[170px]"></img>
        </a>
        <div className="md:order-2 mr-16">
          <p className="mt-4 lg:inline-block lg:mt-0 mr-10 text-base">Contact: 07936 286319</p>
          <button className="bg-[#A2AAB6] py-[8px] px-[40px] rounded-[25px] text-black hover:cursor-pointer">Log in</button>
        </div>
      </div>
    </nav>
  );
};
