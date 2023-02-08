import { ReactElement } from 'react';
import { PageLayout } from 'components/PageLayout/PageLayout';
import { useProducts } from 'hooks/useProducts';
import { Button } from 'components/Buttons/Button';
import { RouteConstants } from 'utilities/route-constants';
import { useNavigate } from 'react-router-dom';
import { AllergenTable } from 'components/AllergenTable/AllergenTable';

export const AllergensPage = (): ReactElement => {
  const { products } = useProducts();
  const navigate = useNavigate();

  return (
    <PageLayout title={'Allergens - Answer King'}>
      <div className="container mx-auto mt-10 mb-10 md:w-[90vw] lg:w-[75vw] xl:w-[50vw]">
        <p className="mb-5 p-5 text-center text-[36px] font-light">Allergen Info</p>

        <div className="rounded-xl bg-white p-[24px]">
          {products.data?.length ? (
            <AllergenTable products={products.data} allergens={ALLERGENS} />
          ) : (
            <p className="mb-5 p-5 text-center font-light">No items found</p>
          )}

          <div className="text-[#333F4C]">
            <div className="flex items-center justify-center p-10">
              <p>Have concerns? Have a chat with one of our staff who can help you!</p>
            </div>
            <div className="flex items-center justify-center gap-5">
              <Button onClick={() => navigate(RouteConstants.HOME)} size="medium" colour="white" className="w-full">
                Back
              </Button>
              <Button onClick={() => navigate(RouteConstants.MENU)} size="medium" colour="yellow" className="w-full">
                Menu
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};
