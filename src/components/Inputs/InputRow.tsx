import cn from 'classnames';

interface Props extends React.ComponentPropsWithoutRef<'input'> {
  label?: string;
}

export const InputRow = ({ className, id, label, type, ...rest }: Props): React.ReactElement => {
  return (
    <div className={cn('flex w-full flex-col gap-1', className)}>
      {label && (
        <label htmlFor={id} className="font-poly italic text-[#A2AAB6]">
          {label}
        </label>
      )}
      <input type={type ?? 'text'} className="border-b-2 py-1" {...rest}></input>
    </div>
  );
};
