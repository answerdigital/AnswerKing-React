import { ReactElement } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

type Props = {
  children: React.ReactNode;
  lineItemsExist: boolean;
};

export default function ComponentTransition({ children, lineItemsExist }: Props): ReactElement {
  return (
    <AnimatePresence>
      {!lineItemsExist && (
        <motion.div initial={{ opacity: 0, scale: 1 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} exit={{ opacity: 0 }}>
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
