import { ReactElement, useState } from 'react';

export const OrderType = (): ReactElement => {
  const [activeButton, setActiveButton] = useState<number>(1);

  return (
    <div>
      <h1 className="mt-2 text-center text-xl font-semibold">Order Summary</h1>
      <div className="mt-3 mb-4 grid h-8 grid-cols-2 rounded-[14px] bg-gray-200 align-bottom">
        <div className="col-span-1 ml-1 pt-1">
          <button
            onClick={() => setActiveButton(1)}
            className={`rounded-xl ${activeButton == 1 ? 'bg-[#ffffff]' : ''} px-4 text-[#333F4C] hover:cursor-pointer hover:bg-gray-50`}
          >
            Delivery
            <span className="pl-2 text-[10px] font-thin">20-35 Mins</span>
          </button>
        </div>
        <div className="col-span-1 ml-auto mr-1 pt-1">
          <button
            onClick={() => setActiveButton(2)}
            className={`rounded-xl ${activeButton == 2 ? 'bg-[#ffffff]' : ''} px-4 text-[#333F4C] hover:cursor-pointer hover:bg-gray-50`}
          >
            Collection
            <span className="pl-2 text-[10px] font-thin">20 Mins</span>
          </button>
        </div>
      </div>
    </div>
  );
};
