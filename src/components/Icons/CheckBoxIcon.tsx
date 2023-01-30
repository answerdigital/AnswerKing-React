import { ReactElement } from 'react';
import checkIcon from 'assets/icon_checked_checkbox.svg';
import unCheckIcon from 'assets/icon_empty_checkbox.svg';


interface Props {
  checked: boolean;
}

export const CheckBoxIcon = ({ checked }: Props): ReactElement => {

  return (
    <div className="w-[36px] h-[36px] flex items-center justify-center">
      {checked ? (
        <img src={checkIcon} alt="checked"/>
      ) : (
        <img src={unCheckIcon} alt="unchecked"/>
      )}
    </div>
  );
};
