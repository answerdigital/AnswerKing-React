import { ReactElement } from 'react';

interface Props {
  children: string;
  background: string
}

export const Badge = ({ children, background }: Props): ReactElement => {
  return (
    <span className={`absolute top-3 left-3 p-1 rounded-full ${background} px-[10px] text-white`}>{children}</span>
  );
};
