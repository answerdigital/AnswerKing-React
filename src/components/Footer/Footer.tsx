import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { RouteConstants } from 'utilities/route-constants';

export const Footer = (): ReactElement => {
  const navigate = useNavigate();

  return (
    <div className="text-ak-grey-5 grid grid-cols-3 justify-items-center gap-3 overflow-hidden">
      <a className="cursor-pointer hover:text-white" data-testid="allergen-board-link" onClick={() => navigate(RouteConstants.ALLERGEN_BOARD)}>
        View Allergen board
      </a>
      <a className="cursor-pointer hover:text-white" data-testid="languages-link" onClick={() => navigate(RouteConstants.LANGUAGE)}>
        Change Language
      </a>
      <a className="cursor-pointer hover:text-white" data-testid="policies-link" onClick={() => navigate(RouteConstants.POLICIES)}>
        View Policies
      </a>
    </div>
  );
};
