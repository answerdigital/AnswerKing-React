import { motion } from 'framer-motion';
import { ReactElement } from 'react';

type Props = {
  children: React.ReactNode;
};

export const PageTransition = (props: Props): ReactElement => {
  return (
    <motion.div initial={{ opacity: 0.5, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }} exit={{ opacity: 0 }}>
      {props.children}
    </motion.div>
  );
};
