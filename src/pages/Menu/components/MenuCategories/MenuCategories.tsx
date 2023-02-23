import { CategoryDto } from 'dtos/CategoryDto';
import { Dispatch, ReactElement, SetStateAction, useState } from 'react';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import { ArrowToggle } from 'common/Icons/ArrowToggle';
import cn from 'classnames';

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
    <div className="mt-8 flex flex-col items-center">
      <p className="text-[36px] font-light">Menu</p>
      <div className="divide-ak-grey-2 mt-5 w-[95%] divide-y-2 ">
        <div className="group flex items-center justify-between text-center">
          <ArrowToggle icon={faArrowLeft} handleIndex={handlePrev} categories={categories} maxItemsDisplayed={maxItemsDisplayed} />
          {categories.slice(index, index + maxItemsDisplayed).map((category) => (
            <motion.button
              key={category.id}
              initial={{ opacity: 0.2, x: direction == 'left' ? 50 : -50 }}
              animate={{ opacity: 1, x: 0, transition: { duration: 1 } }}
              className={cn(
                'left-5 mx-[20px] h-[32px] w-[102px] rounded-full',
                'bg-transparent px-1 text-base font-light',
                category.id === selectedCategory && 'border-ak-grey-1 text-ak-grey-1 bg-ak-grey-4',
                category.id != selectedCategory && 'hover:border-ak-grey-1 hover:bg-ak-grey-1 text-white'
              )}
              onClick={() => {
                setSelectedCategory(category.id);
              }}
            >
              {category.name}
            </motion.button>
          ))}
          <ArrowToggle icon={faArrowRight} handleIndex={handleNext} categories={categories} maxItemsDisplayed={maxItemsDisplayed} />
        </div>
        <div className="mt-5"></div>
      </div>
    </div>
  );
};
