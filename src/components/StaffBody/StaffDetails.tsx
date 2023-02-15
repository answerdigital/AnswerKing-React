import { Button } from 'components/Buttons/Button';
import { ReactElement } from 'react';

export const StaffDetails = (): ReactElement => {
  const inputClass = 'font-poppins w-full bg-transparent text-white focus:outline-none border-b-2 border-gray-300 focus:border-white';
  const labelClass = 'font-poly col-span-2 w-full italic text-lg text-gray-300 w-full';

  return (
    <form className="grid w-[60vw] grid-cols-4 gap-10 border-t-[1px] border-gray-600 py-16" key={'staff details'}>
      <label className={labelClass}>
        Store Name
        <input className={inputClass} type="text" />
      </label>
      <label className={labelClass}>
        Manager&apos;s Name
        <input className={inputClass} type="text" />
      </label>
      <label className={labelClass}>
        Store Phone
        <input className={inputClass} type="text" />
      </label>
      <label className={labelClass}>
        Store Email
        <input className={inputClass} type="email" />
      </label>
      <label className={labelClass}>
        Store Address
        <input className={inputClass} type="text" />
      </label>
      <label className="w-full italic text-gray-400 focus:border-white">
        Opens
        <input
          className="w-full bg-transparent bg-gray-400 text-black focus:outline-none p-1"
          type="time"
          step={900}
          pattern="[0-9]{2}:[0-9]{2}"
          defaultValue="08:00"
        />
      </label>
      <label className="w-full italic text-gray-400 focus:border-white">
        Closes
        <input
          className="w-full bg-transparent bg-gray-400 text-black focus:outline-none p-1"
          type="time"
          step={900}
          pattern="[0-9]{2}:[0-9]{2}"
          defaultValue="21:00"
        />
      </label>
      <div className="flex flex-row justify-between w-[60vw]">
        <div className="flex flex-row gap-[24px]">
          <Button colour="clear" className="border border-white h-[37px] w-[171px] text-sm hover:border-white">
                Delete Account
          </Button>
          <Button colour="clear" className="border border-white h-[37px] w-[118px] text-sm hover:border-white">
                Log Out
          </Button>
        </div>
        <Button colour="yellow" className="h-[37px] w-[99px] text-sm">
                  Save
        </Button>
      </div>
    </form>
  );
};
