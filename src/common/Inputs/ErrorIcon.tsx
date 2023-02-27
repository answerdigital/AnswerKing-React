import { ReactElement, useRef, useState } from 'react';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tooltip from 'common/Tooltip/Tooltip';
import { AnimatePresence } from 'framer-motion';

interface Props {
  message: string;
}

export default function ErrorIcon({ message }: Props): ReactElement {
  const [isTooltipVisible, setIsTooltipVisible] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  return (
    <>
      <AnimatePresence>{isTooltipVisible && <Tooltip parentRef={ref}>{message}</Tooltip>}</AnimatePresence>
      <span className="font-poppins text-red-primary not-italic" ref={ref}>
        <FontAwesomeIcon icon={faCircleExclamation} onMouseOver={() => setIsTooltipVisible(true)} onMouseLeave={() => setIsTooltipVisible(false)} />
      </span>
    </>
  );
}
