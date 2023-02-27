import { ReactElement } from 'react';
import { motion } from 'framer-motion';

interface Props {
  action: number;
  onClick: (action: number) => void;
}

export default function PlusMinusButton({ action, onClick }: Props): ReactElement {
  return (
    <motion.button
      data-testid="plus-minus-button"
      className="bg-ak-grey-5 hover:bg-ak-grey-4 h-10 w-10 rounded-md duration-300"
      whileTap={{ scale: 0.8 }}
      transition={{ type: 'spring' }}
      onClick={() => onClick(action)}
    >
      {action === 1 ? '+' : '-'}
    </motion.button>
  );
}
