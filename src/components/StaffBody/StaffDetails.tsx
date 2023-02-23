import { Button } from 'components/Buttons/Button';
import { ReactElement } from 'react';

export const StaffDetails = (): ReactElement => {
  const inputClass = 'font-poppins w-full bg-transparent text-white focus:outline-none border-b-2 focus:border-white';
  const labelClass = 'font-poly col-span-2 w-full italic text-lg text-ak-grey-4 w-full';

  return (
    <form className="border-ak-grey-2 grid w-[60vw] grid-cols-4 gap-10 border-t-[1px] py-16" key={'staff details'}>
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
      <label className="text-ak-grey-4 w-full italic focus:border-white">
        Opens
        <input
          className="bg-ak-grey-5 w-full bg-transparent p-1 text-black focus:outline-none"
          type="time"
          step={900}
          pattern="[0-9]{2}:[0-9]{2}"
          defaultValue="08:00"
        />
      </label>
      <label className="text-ak-grey-4 w-full italic focus:border-white">
        Closes
        <input
          className="bg-ak-grey-5 w-full bg-transparent p-1 text-black focus:outline-none"
          type="time"
          step={900}
          pattern="[0-9]{2}:[0-9]{2}"
          defaultValue="21:00"
        />
      </label>
      <div className="flex w-[60vw] flex-row justify-between">
        <div className="flex flex-row gap-[24px]">
          <Button colour="clear" className="h-[37px] w-[171px] border border-white text-sm hover:border-white">
            Delete Account
          </Button>
          <Button colour="clear" className="h-[37px] w-[118px] border border-white text-sm hover:border-white">
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
