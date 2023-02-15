import { ErrorSpan } from './ErrorSpan';
import cn from 'classnames';

interface Props {
  forId?: string;
  children?: React.ReactNode;
  error?: string;
  className?: string;
}

export const Label = ({ children, className, error, forId }: Props): React.ReactElement => {
  return (
    <div className={cn('flex flex-row gap-2', className)}>
      {children && (
        <label htmlFor={forId} className="font-poly italic text-[#A2AAB6]">
          {children}
        </label>
      )}
      {error && <ErrorSpan message={error} />}
    </div>
  );
};
