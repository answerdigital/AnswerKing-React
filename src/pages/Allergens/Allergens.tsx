import { ReactElement } from 'react';
import { PageLayout } from 'components/PageLayout/PageLayout';

export const AllergensPage = (): ReactElement => {
  return (
    <PageLayout title={'Allergens - Answer King'}>
      <div className="container mx-auto mt-[2%] h-[60vh] w-[50%] min-w-[500px] border-2">
        <p className="border-b-2 border-[#5A6675] text-center text-[36px] font-[300]">Menu</p>
        <div className="grid grid-cols-12">
          <div className="col-span-3"></div>
          <div className="col-span-9 ml-5 flex h-[100px] border-2 pt-[60px]">
            <div className="ml-[20px] w-[20px] rotate-[270deg]">Milk</div>
            <div className="ml-[20px] w-[20px] rotate-[270deg]">Celery</div>
            <div className="ml-[20px] w-[20px] rotate-[270deg]">Sesame</div>
            <div className="ml-[20px] w-[20px] rotate-[270deg]">Egg</div>
            <div className="ml-[20px] w-[20px] rotate-[270deg]">Shellfish</div>
            <div className="ml-[20px] w-[20px] rotate-[270deg]">Molluscs</div>
            <div className="ml-[20px] w-[20px] rotate-[270deg]">Fish</div>
            <div className="ml-[20px] w-[20px] rotate-[270deg]">Soya</div>
            <div className="ml-[20px] w-[20px] rotate-[270deg]">Mustard</div>
            <div className="ml-[20px] w-[20px] rotate-[270deg]">Nuts</div>
            <div className="ml-[20px] w-[20px] rotate-[270deg]">Gluten</div>
            <div className="ml-[20px] w-[20px] rotate-[270deg]">Sulphur Dioxide</div>
            <div className="ml-[20px] w-[20px] rotate-[270deg]">Lupin</div>
            <div className="ml-[20px] w-[20px] rotate-[270deg]">Pednuts</div>
          </div>
          <div className="col-span-3 mt-[2vh] h-[250px] border-2 text-center">Burger Names</div>
          <div className="col-span-9 ml-5 mt-[2vh] border-2 text-center">Allergen table</div>
        </div>
      </div>
    </PageLayout>
  );
};
