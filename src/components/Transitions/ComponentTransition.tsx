import { AnimatePresence, motion } from 'framer-motion';
import { ReactElement } from 'react';

type Props = {
  children: React.ReactNode;
  lineItemsExist: boolean;
};

export const ComponentTransition = (props: Props): ReactElement => {
  return (
    <AnimatePresence>
      {!props.lineItemsExist && (
        <motion.div key="1" initial={{ opacity: 0, scale: 1 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} exit={{ opacity: 0 }}>
          {props.children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
