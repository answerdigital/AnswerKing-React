import { CheckBoxIcon } from 'components/Icons/CheckBoxIcon';
import cn from 'classnames';
import { ReactElement } from 'react';

interface Props extends React.ComponentPropsWithoutRef<'div'> {
  label: string;
  checked: boolean;
}

export const CheckboxRow = ({ checked, className, label, ...rest }: Props): ReactElement => {
  return (
    <div className={cn('bg-ak-grey-6 flex w-full select-none items-center justify-center gap-1 rounded-lg', className)}>
      <CheckBoxIcon checked={checked ?? false} className={'cursor-pointer'} {...rest} />
      {label}
    </div>
  );
};
