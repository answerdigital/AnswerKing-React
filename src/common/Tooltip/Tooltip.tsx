import { ReactElement, useCallback, useLayoutEffect, useRef } from 'react';
import cn from 'classnames';
import { motion } from 'framer-motion';

interface Props {
  parentRef: React.RefObject<Element>;
  children: React.ReactNode;
}

const TOOLTIP_GAP = 10;

export default function Tooltip({ parentRef, children }: Props): ReactElement {
  const ref = useRef<HTMLDivElement>(null);

  const handleParentResize = useCallback(() => {
    const parentElement = parentRef.current;
    const tooltipElement = ref.current;

    if (!parentElement || !tooltipElement) {
      return;
    }

    const parentRect = parentElement.getBoundingClientRect();
    const tooltipRect = tooltipElement.getBoundingClientRect();

    const middlePos = parentRect.left + parentRect.width / 2;
    const topPos = parentRect.top - (tooltipRect.height + TOOLTIP_GAP);

    ref.current.style.top = `${topPos}px`;
    ref.current.style.left = `${middlePos}px`;
  }, [parentRef]);

  useLayoutEffect(() => {
    handleParentResize();

    window.addEventListener('resize', () => handleParentResize());

    return () => {
      window.removeEventListener('resize', () => handleParentResize());
    };
  }, [parentRef]);

  return (
    <motion.div
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1 }}
      exit={{ opacity: 0 }}
      className={cn('text-ak-grey-1 absolute w-fit max-w-sm -translate-x-1/2 rounded-lg bg-white p-2 text-sm shadow-md')}
      ref={ref}
    >
      <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-white" />
      {children}
    </motion.div>
  );
}
