import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
  title: string;
  onEditClick?: () => void;
  children: React.ReactNode;
}

export const CheckoutSection = ({ title, onEditClick, children }: Props): React.ReactElement => {
  return (
    <div className="mb-6 flex w-full flex-col gap-2">
      <div className="flex w-full flex-row items-center justify-between">
        <h2>{title}</h2>
        {onEditClick && (
          <span className="group flex h-[33px] w-[33px] cursor-pointer items-center justify-center rounded border bg-[#E4EAEB]"
            onClick={onEditClick}
            role="button">
            <FontAwesomeIcon icon={faPencilAlt} />
          </span>
        )}
      </div>
      {children}
    </div>
  );
};
