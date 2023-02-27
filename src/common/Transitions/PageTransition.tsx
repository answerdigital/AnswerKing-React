import { ReactElement } from 'react';
import { motion } from 'framer-motion';

type Props = {
  children: React.ReactNode;
};

export default function PageTransition({ children }: Props): ReactElement {
  return (
    <motion.div initial={{ opacity: 0.5, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }} exit={{ opacity: 0 }}>
      {children}
    </motion.div>
  );
}
