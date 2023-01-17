import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { RouteConstants } from 'utilities/route-constants';

export const Footer = (): ReactElement => {
  const navigate = useNavigate();

  return (
    <>
      <div className="mt-20 grid grid-cols-3 justify-items-center gap-3 text-gray-400">
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
