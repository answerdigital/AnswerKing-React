import './Staff.scss';
import { ItemCreateForm } from 'components/ItemCreateForm/ItemCreateForm';
import { ItemsTable } from 'components/ItemsTable/ItemsTable';
import { ReactElement } from 'react';
import { Helmet } from 'react-helmet-async';

export const StaffPage = (): ReactElement => {
  return (
    <>
      <Helmet>
        <title>Staff - Answer King</title>
      </Helmet>
      <div className="staff mw-960">
        <ItemCreateForm />
        <ItemsTable />
      </div>
    </>
  );
};
