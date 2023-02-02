import { ReactElement } from 'react';
import { PageLayout } from 'components/PageLayout/PageLayout';
import { useProducts } from 'hooks/useProducts';
import { Button } from 'components/Button/Button';
import { RouteConstants } from 'utilities/route-constants';
import { useNavigate } from 'react-router-dom';
import { AllergenTable } from 'components/AllergenTable/AllergenTable';

const ALLERGENS = [
  'Milk',
  'Celery',
  'Sesame',
  'Egg',
  'Shellfish',
  'Molluscs',
  'Fish',
  'Soya',
  'Mustard',
  'Nuts',
  'Gluten',
  'Sulphur Dioxide',
  'Lupin',
  'Peanuts',
];

export const AllergensPage = (): ReactElement => {
  const { products } = useProducts();
  const navigate = useNavigate();

  return (
    <PageLayout title={'Allergens - Answer King'}>
      <div className="container mx-auto mt-10 mb-10 w-[50%] min-w-[500px]">
        <p className="mb-5 border-b-2 border-[#5A6675] p-5 text-center text-[36px] font-light">Allergen Info</p>

        {products.data?.length ? (
          <AllergenTable products={products.data} allergens={ALLERGENS} />
        ) : (
          <p className="mb-5 p-5 text-center font-light">No items found</p>
        )}

        <div className="border-t-2 border-[#5A6675]">
          <div className="flex items-center justify-center p-10">
            <p className="font-light">Have concerns? Have a chat with one of our staff who can help you!</p>
          </div>
          <div className="flex items-center justify-center gap-5">
            <Button onClick={() => navigate(RouteConstants.HOME)} size="medium" colour="clear-border" className="w-full">
              Back
            </Button>
            <Button onClick={() => navigate(RouteConstants.MENU)} size="medium" colour="yellow" className="w-full">
              Menu
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};
