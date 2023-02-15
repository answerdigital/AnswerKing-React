import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
  children: React.ReactNode;
}

export const ErrorSpan = ({ children }: Props): React.ReactElement => {
  return (
    <span className="font-poppins ml-2 not-italic text-red-500">
      <FontAwesomeIcon icon={faCircleExclamation} className="mr-1" />
      {children}
    </span>
  );
};
