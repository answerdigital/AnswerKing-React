import { ErrorIcon } from './ErrorIcon';
import cn from 'classnames';
import { ReactElement } from 'react';

interface Props {
  forId?: string;
  children?: React.ReactNode;
  error?: string;
  className?: string;
}

export const Label = ({ children, className, error, forId }: Props): ReactElement => {
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
};
