import { motion } from 'framer-motion';
import { ReactElement } from 'react';

interface Props {
  action: number;
  onClick: (action: number) => void;
}

export const PlusMinusButton = ({ action, onClick }: Props): ReactElement => (
  <motion.button
    data-testid="plus-minus-button"
    className="h-10 w-10 rounded-md bg-[#E4EAEB] duration-300 hover:bg-[#c6c6c6]"
    whileTap={{ scale: 0.8 }}
    transition={{ type: 'spring' }}
    onClick={() => onClick(action)}
  >
    {action === 1 ? '+' : '-'}
  </motion.button>
);
