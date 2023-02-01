import { ReactElement } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from 'classnames';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { CategoryDto } from 'dtos/CategoryDto';

interface Props {
  icon: IconDefinition;
  handleIndex: () => void;
  categories: CategoryDto[];
  maxItemsDisplayed: number;
}

export const ArrowToggle = ({ icon, handleIndex, categories, maxItemsDisplayed }: Props): ReactElement => {
  const moreThan4Categories =
    categories.filter((category) => !category?.retired === false || category.products?.length !== 0).length > maxItemsDisplayed;
  return (
    <>
      {moreThan4Categories && (
        <div
          className="z-10 my-auto flex h-[25px] w-[25px] cursor-pointer items-center justify-center rounded-full border border-[#ffffff]
    text-center hover:cursor-pointer group-hover:border-[#E4EAEB]"
          onClick={handleIndex}
        >
          <FontAwesomeIcon icon={icon} className={cn('text-[13px] text-[#ffffff] group-hover:text-[#E4EAEB]')} />
        </div>
      )}
    </>
  );
};
