import { ReactElement } from 'react';
import classNames from 'classnames';

interface Props extends React.ComponentPropsWithoutRef<'div'> {
  checked: boolean;
  className?: string;
}

export const CheckBoxIcon = ({ checked, className, ...rest }: Props): ReactElement => {
  return (
    <div className="fill-ak-grey-1 flex h-[30px] w-[30px] items-center justify-center" {...rest}>
      {checked ? (
        <svg width="37" height="37" viewBox="0 0 37 37" xmlns="http://www.w3.org/2000/svg" className={classNames(className)}>
          <path
            d="M28.9 5.30615H7.90002C6.25002 5.30615 4.90002 6.65615 4.90002 8.30615V29.3062C4.90002
            30.9562 6.25002 32.3062 7.90002 32.3062H28.9C30.55 32.3062 31.9 30.9562 31.9 29.3062V8.30615C31.9
            6.65615 30.55 5.30615 28.9 5.30615ZM28.9 29.3062H7.90002V8.30615H28.9V29.3062ZM27.385 14.3062L25.27
            12.1762L15.385 22.0612L11.515 18.2062L9.38502 20.3212L15.385 26.3062L27.385 14.3062Z"
          />
        </svg>
      ) : (
        <svg width="37" height="37" viewBox="0 0 37 37" xmlns="http://www.w3.org/2000/svg" className={classNames(className)}>
          <path
            d="M28.7 4.7041H7.69995C6.03495 4.7041 4.69995 6.0391 4.69995 7.7041V28.7041C4.69995 29.4998
            5.01602 30.2628 5.57863 30.8254C6.14124 31.388 6.9043 31.7041 7.69995 31.7041H28.7C29.4956 31.7041
            30.2587 31.388 30.8213 30.8254C31.3839 30.2628 31.7 29.4998 31.7 28.7041V7.7041C31.7 6.0391 30.35
            4.7041 28.7 4.7041ZM28.7 7.7041V28.7041H7.69995V7.7041H28.7Z"
          />
        </svg>
      )}
    </div>
  );
};
