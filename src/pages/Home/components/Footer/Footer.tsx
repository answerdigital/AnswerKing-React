import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import PageRoutes from 'utilities/Constants/PageRoutes';

export default function Footer(): ReactElement {
  const navigate = useNavigate();

  return (
    <div className="text-ak-grey-5 grid grid-cols-3 justify-items-center gap-3 overflow-hidden">
      <button
        type="button"
        className="cursor-pointer hover:text-white"
        data-testid="allergen-board-link"
        onClick={() => navigate(PageRoutes.ALLERGEN_BOARD)}
      >
        View Allergen board
      </button>
      <button type="button" className="cursor-pointer hover:text-white" data-testid="languages-link" onClick={() => navigate(PageRoutes.LANGUAGE)}>
        Change Language
      </button>
      <button type="button" className="cursor-pointer hover:text-white" data-testid="policies-link" onClick={() => navigate(PageRoutes.POLICIES)}>
        View Policies
      </button>
    </div>
  );
}
