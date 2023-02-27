import { ReactElement } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

type Props = {
  children: React.ReactNode;
};

export default function ModalTransition({ children }: Props): ReactElement {
  return (
    <AnimatePresence>
      <motion.div
        initial={{
          opacity: 0.5,
          scale: 0.5,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          transition: {
            ease: 'easeOut',
            duration: 0.3,
          },
        }}
        exit={{
          opacity: 0,
          scale: 0.5,
          transition: {
            ease: 'easeIn',
            duration: 0.3,
          },
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
