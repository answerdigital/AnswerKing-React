import { ReactElement } from 'react';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from 'classnames';
import { CategoryDto } from 'dtos/CategoryDto';

interface Props {
  icon: IconDefinition;
  handleIndex: () => void;
  categories: CategoryDto[];
  maxItemsDisplayed: number;
}

export default function ArrowToggle({ icon, handleIndex, categories, maxItemsDisplayed }: Props): ReactElement {
  return (
    <div>
      {categories.length > maxItemsDisplayed && (
        <button
          type="button"
          className="z-10 my-auto flex h-[25px] w-[25px] cursor-pointer items-center justify-center rounded-full border border-[#ffffff]
            text-center hover:cursor-pointer group-hover:border-[#E4EAEB]"
          onClick={handleIndex}
        >
          <FontAwesomeIcon icon={icon} className={cn('text-[13px] text-[#ffffff] group-hover:text-[#E4EAEB]')} />
        </button>
      )}
    </div>
  );
}
