import { CategoryDto } from 'dtos/CategoryDto';
import { Dispatch, ReactElement, SetStateAction, useState } from 'react';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import cn from 'classnames';
import { motion } from 'framer-motion';
import { ArrowToggle } from 'components/Icons/ArrowToggle';

interface Props {
  setSelectedCategory: Dispatch<SetStateAction<number>>;
  selectedCategory: number;
  categories: CategoryDto[];
}

export const MenuCategories = ({ categories, setSelectedCategory, selectedCategory }: Props): ReactElement => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState('');
  const maxItemsDisplayed = 4;

  const handleNext = (): void => {
    setIndex((prevIndex) => (prevIndex + maxItemsDisplayed >= categories.length ? 0 : prevIndex + maxItemsDisplayed));
    setDirection('left');
  };

  const handlePrev = (): void => {
    setIndex((prevIndex) => (prevIndex - maxItemsDisplayed < 0 ? prevIndex : prevIndex - maxItemsDisplayed));
    setDirection('right');
  };

  return (
    <div className="mt-5 flex flex-col items-center">
      <p className="text-[36px] font-[300]">Menu</p>
      <div className="mt-5 w-[95%] divide-y-2 divide-slate-700">
        <div className="group flex items-center justify-between text-center">
          <ArrowToggle icon={faArrowLeft} handleIndex={handlePrev} categories={categories} maxItemsDisplayed={maxItemsDisplayed} />
          {categories.slice(index, index + maxItemsDisplayed).map(
            (category) =>
              !category?.retired === false ||
              (category.products?.length !== 0 && (
                <motion.button
                  key={category.id}
                  initial={{ opacity: 0.2, x: direction == 'left' ? 50 : -50 }}
                  animate={{ opacity: 1, x: 0, transition: { duration: 1 } }}
                  className={cn(
                    'left-5 mx-[20px] h-[32px] w-[102px] rounded-full',
                    'bg-transparent px-1 text-[16px] font-[300] text-[#ffffff] hover:border-[#333F4C] hover:bg-[#333F4C]',
                    category.id === selectedCategory && 'border-[#333F4C] bg-[#A2AAB6] text-gray-900'
                  )}
                  onClick={() => {
                    setSelectedCategory(category.id);
                  }}
                >
                  {category.name}
                </motion.button>
              ))
          )}
          <ArrowToggle icon={faArrowRight} handleIndex={handleNext} categories={categories} maxItemsDisplayed={maxItemsDisplayed} />
        </div>
        <div className="mt-5"></div>
      </div>
    </div>
  );
};
