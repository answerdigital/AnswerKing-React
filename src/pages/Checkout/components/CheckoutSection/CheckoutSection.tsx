import { ReactElement } from 'react';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'common/Buttons/Button';

interface Props {
  title: string;
  onEditClick?: () => void;
  children: React.ReactNode;
}

export default function CheckoutSection({ title, onEditClick, children }: Props): ReactElement {
  return (
    <div className="mb-3 flex w-full flex-col gap-2">
      <div className="flex w-full flex-row items-center justify-between leading-6">
        <h2>{title}</h2>
        {onEditClick && (
          <span
            className="bg-ak-grey-5 group flex h-[33px] w-[33px] cursor-pointer items-center justify-center rounded"
            onClick={onEditClick}
            onKeyDown={onEditClick}
            role="button"
            tabIndex={0}
          >
            <FontAwesomeIcon icon={faPencilAlt} />
          </span>
        )}
      </div>
      {children}
    </div>
  );
}
