import { ReactElement } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from 'classnames';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';

interface Props {
  icon: IconDefinition;
  handleIndex: () => void;
}

export const ArrowToggle = ({ icon, handleIndex }: Props): ReactElement => {
  return (
    <div
      className="z-10 my-auto flex h-[25px] w-[25px] cursor-pointer items-center justify-center rounded-full border border-[#ffffff]
    text-center hover:cursor-pointer group-hover:border-[#E4EAEB]"
      onClick={handleIndex}
    >
      <FontAwesomeIcon icon={icon} className={cn('text-[13px] text-[#ffffff] group-hover:text-[#E4EAEB]')} />
    </div>
  );
};
