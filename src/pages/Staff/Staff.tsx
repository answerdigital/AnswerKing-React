import './Staff.scss';
import { ProductCreateForm } from 'components/ProductCreateForm/ProductCreateForm';
import { ProductsTable } from 'components/ProductsTable/ProductsTable';
import { ReactElement } from 'react';
import { Helmet } from 'react-helmet-async';
import { PageTransition } from 'components/PageTransition/PageTransition';

export const StaffPage = (): ReactElement => {
  return (
    <>
      <Helmet>
        <title>Staff - Answer King</title>
      </Helmet>
      <PageTransition>
        <div className="staff mw-960">
          <ProductCreateForm />
          <ProductsTable />
        </div>
      </PageTransition>
    </>
  );
};
