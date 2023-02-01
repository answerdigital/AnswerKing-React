import { CategoryDto } from 'dtos/CategoryDto';
import { Dispatch, ReactElement, SetStateAction, useState } from 'react';
import { Button } from 'components/Button/Button';
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
        <div className="group flex items-center justify-between">
          <ArrowToggle icon={faArrowLeft} handleIndex={handlePrev} />
          {categories.slice(index, index + 5).map(
            (category, index) =>
              category?.retired === false && (
                <motion.button key={category.id} initial={{ opacity: 0.2, x: 50 }} animate={{ opacity: 1, x: 0, transition: { duration: 1 } }}>
                  <Button
                    key={index}
                    size="medium"
                    colour="clear"
                    className={cn(
                      'left-5 mx-[20px] h-[32px] w-[102px]',
                      'bg-transparent px-5 text-[16px] font-[300] text-[#ffffff]',
                      category.id === selectedCategory && 'border-[#333F4C] bg-[#A2AAB6] text-gray-900'
                    )}
                    onClick={() => {
                      setSelectedCategory(category.id);
                    }}
                  >
                    {category.name}
                  </Button>
                </motion.button>
              )
          )}
          <ArrowToggle icon={faArrowRight} handleIndex={handleNext} />
        </div>
        <div className="mt-5"></div>
      </div>
    </div>
  );
};
