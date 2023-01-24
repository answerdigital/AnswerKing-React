import './Staff.scss';
import { ProductCreateForm } from 'components/ProductCreateForm/ProductCreateForm';
import { ProductsTable } from 'components/ProductsTable/ProductsTable';
import { ReactElement } from 'react';
import { PageLayout } from 'components/PageLayout/PageLayout';

export const StaffPage = (): ReactElement => {
  return (
    <PageLayout title={'Admin - Answer King'}>
      <div className="staff mw-960">
        <ProductCreateForm />
        <ProductsTable />
      </div>
    </PageLayout>
  );
};
