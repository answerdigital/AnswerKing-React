import {ReactElement} from 'react';
import {useNavigate} from 'react-router-dom';
import {RouteConstants} from 'utilities/route-constants';

export const Footer = (): ReactElement => {
  const navigate = useNavigate();

  return (
    <>
      <div className="grid grid-cols-3 gap-3 mt-20 justify-items-center text-gray-400">
        <a className="cursor-pointer hover:text-white" onClick={() => navigate(RouteConstants.ALLERGEN_BOARD)}>
          View Allergen board
        </a>
        <a className="cursor-pointer hover:text-white" onClick={() => navigate(RouteConstants.LANGUAGE)}>
          Change Language
        </a>
        <a className="cursor-pointer hover:text-white" onClick={() => navigate(RouteConstants.POLICIES)}>
          View Policies
        </a>
      </div>
    </>
  );
};

export default Footer;
