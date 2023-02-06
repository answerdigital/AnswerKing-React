import { CheckBoxIcon } from 'components/Icons/CheckBoxIcon';
import cn from 'classnames';

interface Props extends React.ComponentPropsWithoutRef<'input'> {
  label: string;
}

export const CheckboxRow = ({ checked, className, label, ...rest }: Props): React.ReactElement => {
  return (
    <div className={cn('flex w-full select-none items-center justify-center gap-1 rounded-lg bg-[#F7F7F7]', className)}>
      <CheckBoxIcon checked={checked ?? false} className={'cursor-pointer'} {...rest} />
      {label}
    </div>
  );
};
