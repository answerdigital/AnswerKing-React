import { ReactElement } from 'react';

interface Props {
  children: string;
}

export default function BadgeIcon({ children }: Props): ReactElement {
  return (
    <div
      className="bg-backdrop-blur-md bg-white-25 bg-ak-grey-1 absolute top-3 left-3
                flex h-[19px] w-[38px] items-center justify-center rounded-full px-[8px]
                py-[2px] text-center text-[10px] text-white"
    >
      <span>{children}</span>
    </div>
  );
}
