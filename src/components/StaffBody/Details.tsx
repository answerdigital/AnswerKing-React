import { Button } from 'components/Button/Button';
import { ReactElement } from 'react';

export const StaffDetails = (): ReactElement => {
  const inputClass = 'w-full bg-transparent text-white focus:outline-none border-b-2 border-gray-400 focus:border-white';
  const labelClass = 'col-span-2 w-full italic text-lg text-gray-400 w-full';

  return (
    <form className="grid w-[60%] grid-cols-4 gap-8 border-t-[1px] border-gray-600 py-16" key={'staff details'}>
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
      <label className="w-full w-full italic text-gray-400 focus:border-white">
        Opens
        <input
          className="w-full bg-transparent bg-gray-400 text-black focus:outline-none"
          type="time"
          step={900}
          pattern="[0-9]{2}:[0-9]{2}"
          defaultValue="08:00"
        />
      </label>
      <label className="w-full w-full italic text-gray-400 focus:border-white">
        Closes
        <input
          className="w-full bg-transparent bg-gray-400 text-black focus:outline-none"
          type="time"
          step={900}
          pattern="[0-9]{2}:[0-9]{2}"
          defaultValue="21:00"
        />
      </label>
      <div>
        <Button colour="clear-border" size="medium">
          Delete Account
        </Button>
      </div>
      <div>
        <Button colour="clear-border" size="medium">
          Log Out
        </Button>
      </div>
      <div></div>
      <div>
        <Button colour="yellow" size="medium">
          Save
        </Button>
      </div>
    </form>
  );
};
