import { CategoryDto } from 'dtos/CategoryDto';
import { Dispatch, ReactElement, SetStateAction } from 'react';
import { Button } from 'components/Button/Button';
import cn from 'classnames';
interface Props {
  setSelectedCategory: Dispatch<SetStateAction<number>>;
  selectedCategory: number;
  categories: CategoryDto[];
}

export const MenuCategories = ({ categories, setSelectedCategory, selectedCategory }: Props): ReactElement => {
  return (
    <div className="mt-5 flex flex-col items-center">
      <p className="text-[36px] font-[300]">Menu</p>
      <div className="mt-5 w-[95%] divide-y-2 divide-slate-700">
        <div>
          {categories.map(
            (category) =>
              !category?.retired && (
                <Button
                  key={category.id}
                  size="medium"
                  colour="clear"
                  className={cn(
                    'mx-[20px] bg-transparent py-0.5 px-5 h-[32px] w-[102px] text-[16px] font-[300] text-[#ffffff]',
                    category.id === selectedCategory && 'border-[#333F4C] bg-[#A2AAB6] text-gray-900'
                  )}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </Button>
              )
          )}
        </div>
        <div className="mt-5"></div>
      </div>
    </div>
  );
};
