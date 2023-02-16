import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tooltip } from 'components/Tooltip/Tooltip';
import { AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';

interface Props {
  message: string;
}

export const ErrorIcon = ({ message }: Props): React.ReactElement => {
  const [isTooltipVisible, setIsTooltipVisible] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <>
      <AnimatePresence>{isTooltipVisible && <Tooltip parentRef={ref}>{message}</Tooltip>}</AnimatePresence>
      <span className="font-poppins not-italic text-red-500" ref={ref}>
        <FontAwesomeIcon icon={faCircleExclamation} onMouseOver={() => setIsTooltipVisible(true)} onMouseLeave={() => setIsTooltipVisible(false)} />
      </span>
    </>
  );
};
