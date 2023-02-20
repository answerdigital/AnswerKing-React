import { ReactElement } from 'react';
import Button from 'common/Buttons/Button';

export default function StaffDetails(): ReactElement {
  const inputClass = 'font-poppins w-full bg-transparent text-white focus:outline-none border-b-2 border-gray-300 focus:border-white';
  const labelClass = 'font-poly col-span-2 w-full italic text-lg text-gray-300 w-full';

  return (
    <form className="grid w-[60vw] grid-cols-4 gap-10 border-t-[1px] border-gray-600 py-16" key="staff details">
      <label htmlFor="storeName" className={labelClass}>
        Store Name
        <input id="storeName" className={inputClass} type="text" />
      </label>
      <label htmlFor="managerName" className={labelClass}>
        Manager&apos;s Name
        <input id="managerName" className={inputClass} type="text" />
      </label>
      <label htmlFor="storePhone" className={labelClass}>
        Store Phone
        <input id="storePhone" className={inputClass} type="text" />
      </label>
      <label htmlFor="storeEmail" className={labelClass}>
        Store Email
        <input id="storeEmail" className={inputClass} type="email" />
      </label>
      <label htmlFor="storeAddress" className={labelClass}>
        Store Address
        <input id="storeAddress" className={inputClass} type="text" />
      </label>
      <label htmlFor="opens" className="text-ak-grey-4 w-full italic focus:border-white">
        Opens
        <input
          className="bg-ak-grey-5 w-full bg-transparent p-1 text-black focus:outline-none"
          id="opens"
          type="time"
          step={900}
          pattern="[0-9]{2}:[0-9]{2}"
          defaultValue="08:00"
        />
      </label>
      <label htmlFor="closes" className="text-ak-grey-4 w-full italic focus:border-white">
        Closes
        <input
          className="bg-ak-grey-5 w-full bg-transparent p-1 text-black focus:outline-none"
          id="closes"
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
}
