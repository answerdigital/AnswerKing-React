import { ReactElement, useMemo } from 'react';
import Button from 'common/Buttons/Button';
import PageLayout from 'common/PageLayout/PageLayout';
import { ProductDto } from 'dtos/Product/ProductDto';
import useProducts from 'hooks/useProducts';
import { useNavigate } from 'react-router-dom';
import Allergens from 'utilities/Constants/Allergens';
import PageRoutes from 'utilities/Constants/PageRoutes';
import AllergenTable from './components/AllergenTable/AllergenTable';

const AllergensPage = (): ReactElement => {
  const { products } = useProducts();
  const navigate = useNavigate();

  const filteredProducts = useMemo(() => products.data?.filter((product: ProductDto) => !product.retired) ?? [], [products.data?.length]);

  return (
    <PageLayout title="Allergens - Answer King">
      <div className="container mx-auto mt-10 mb-10 md:w-[90vw] lg:w-[75vw] xl:w-[50vw]">
        <p className="mb-5 p-5 text-center text-[36px] font-light">Allergen Info</p>

        <div className="text-ak-grey-1 rounded-xl bg-white p-[24px]">
          {filteredProducts.length ? (
            <AllergenTable products={filteredProducts} allergens={Allergens} />
          ) : (
            <p className="mb-5 border-b-2 p-5 text-center">No items found</p>
          )}

          <div className="flex items-center justify-center p-10">
            <p>Have concerns? Have a chat with one of our staff who can help you!</p>
          </div>
          <div className="flex h-[45px] items-center justify-center gap-5">
            <Button onClick={() => navigate(PageRoutes.HOME)} colour="white" className="h-[45px] w-full">
              Back
            </Button>
            <Button onClick={() => navigate(PageRoutes.MENU)} colour="yellow" className="h-[45px] w-full">
              Menu
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default AllergensPage;
