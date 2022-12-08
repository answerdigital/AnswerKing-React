import { CategoryDto } from 'dtos/CategoryDto';
import { Dispatch, ReactElement, SetStateAction } from 'react';
import { Button } from 'components/Button/Button';

interface Props {
  setSelectedCategory: Dispatch<SetStateAction<number>>;
  selectedCategory: number;
  categories: CategoryDto[];
}

export const MenuCategories = ({ categories, setSelectedCategory, selectedCategory }: Props): ReactElement => {
  return (
    <div className="mt-5 flex flex-col items-center">
      <h2 className="leading=[54px] mb-3 text-[46px]">Menu</h2>
      <div className="mt-5">
        <div>
          {categories.map((category) => (
            <Button
              key={category.id}
              size="medium"
              className={category.id === selectedCategory ? 'border-[#A2AAB6] bg-[#A2AAB6]' : ''}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>
        <hr className="mt-5 mb-10 w-[100%]"></hr>
      </div>
    </div>
  );
};
