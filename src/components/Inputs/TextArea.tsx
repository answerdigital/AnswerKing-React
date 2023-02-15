import React from 'react';
import cn from 'classnames';
import { Label } from './Label';
interface Props extends React.ComponentPropsWithRef<'textarea'> {
  label?: string;
  error?: string;
  id: string;
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, Props>(({ label, className, id, error, ...rest }, ref) => {
  return (
    <div className={cn('flex w-full flex-col gap-1', className)}>
      {(label || error) && (
        <Label forId={id} error={error}>
          {label}
        </Label>
      )}
      <div className={cn('flex w-full flex-col gap-1', className)}>
        <textarea className="w-full resize-none border-b-2" id={id} ref={ref} {...rest} />
      </div>
    </div>
  );
});

TextArea.displayName = 'TextArea';
