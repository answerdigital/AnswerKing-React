import { CategoryDto } from 'dtos/CategoryDto';
import { Dispatch, ReactElement, SetStateAction, useState } from 'react';
import { Button } from 'components/Button/Button';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from 'classnames';

interface Props {
  setSelectedCategory: Dispatch<SetStateAction<number>>;
  selectedCategory: number;
  categories: CategoryDto[];
}

export const MenuCategories = ({ categories, setSelectedCategory, selectedCategory }: Props): ReactElement => {
  const [index, setIndex] = useState(0);

  const handleNext = (): void => {
    setIndex((prevIndex) => (prevIndex + 5 >= categories.length ? 0 : prevIndex + 5));
  };

  const handlePrev = (): void => {
    setIndex((prevIndex) => (prevIndex - 5 < 0 ? prevIndex : prevIndex - 5));
  };

  return (
    <div className="mt-5 flex flex-col items-center">
      <p className="text-[36px] font-[300]">Menu</p>
      <div className="mt-5 w-[95%] divide-y-2 divide-slate-700">
        <div className="flex items-center justify-between">
          <div
            className="my-auto flex h-[30px] w-[30px] items-center justify-center rounded-full border border-[#ffffff] text-center"
            onClick={handlePrev}
          >
            <FontAwesomeIcon icon={faArrowLeft} className={cn('cursor-pointer text-[15px] text-[#ffffff]')} />
          </div>
          <div className="transition-transform duration-500 ease-out">
            {categories.slice(index, index + 5).map(
              (category, index) =>
                category?.retired === false && (
                  <Button
                    key={index}
                    size="medium"
                    colour="clear"
                    className={cn(
                      'left-5 mx-[20px] h-[32px] w-[102px]',
                      'bg-transparent px-5 text-[16px] font-[300] text-[#ffffff] transition-all duration-300 ease-in-out',
                      category.id === selectedCategory && 'border-[#333F4C] bg-[#A2AAB6] text-gray-900'
                    )}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.name}
                  </Button>
                )
            )}
          </div>
          <div
            className="my-auto flex h-[30px] w-[30px] items-center justify-center rounded-full border border-[#ffffff] text-center"
            onClick={handleNext}
          >
            <FontAwesomeIcon icon={faArrowRight} className={cn('cursor-pointer text-[15px] text-[#ffffff]')} />
          </div>
        </div>
        <div className="mt-5"></div>
      </div>
    </div>
  );
};
