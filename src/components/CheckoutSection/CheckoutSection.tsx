import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'components/Buttons/Button';

interface Props {
  title: string;
  onEditClick?: () => void;
  children: React.ReactNode;
}

export const CheckoutSection = ({ title, onEditClick, children }: Props): React.ReactElement => {
  return (
    <div className="mb-4 flex w-full flex-col gap-2">
      <div className="flex w-full flex-row items-center justify-between">
        <h2>{title}</h2>
        {onEditClick && (
          <Button size="small" colour="light-grey" className="w-fit rounded-lg border-0 px-2" onClick={onEditClick}>
            <FontAwesomeIcon icon={faPencilAlt} />
          </Button>
        )}
      </div>
      {children}
    </div>
  );
};
