import React, { forwardRef, ReactElement, Ref } from 'react';
import cn from 'classnames';
import Label from './Label';

interface Props extends React.ComponentPropsWithRef<'textarea'> {
  label?: string;
  error?: string;
  id: string;
}

function TextArea({ label, className, id, error, ...rest }: Props, ref: Ref<HTMLTextAreaElement>): ReactElement {
  return (
    <div className={cn('flex w-full flex-col gap-1', className)}>
      {(label || error) && (
        <Label forId={id} error={error}>
          {label}
        </Label>
      )}
      <textarea className="w-full resize-none border-b-2" id={id} ref={ref} {...rest} />
    </div>
  );
}

export default forwardRef(TextArea);
