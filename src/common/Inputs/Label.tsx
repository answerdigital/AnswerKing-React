import { ReactElement } from 'react';
import cn from 'classnames';
import ErrorIcon from './ErrorIcon';

interface Props {
  forId?: string;
  children?: React.ReactNode;
  error?: string;
  className?: string;
}

export default function Label({ children, className, error, forId }: Props): ReactElement {
  return (
    <div className={cn('flex flex-row gap-2', className)}>
      {children && (
        <label htmlFor={forId} className="font-poly text-ak-grey-4 italic">
          {children}
        </label>
      )}
      {error && <ErrorIcon message={error} />}
    </div>
  );
}
