import './Staff.scss';
import { ItemCreateForm } from 'components/ItemCreateForm/ItemCreateForm';
import { ItemsTable } from 'components/ItemsTable/ItemsTable';
import React, { ReactElement } from 'react';
import { Helmet } from 'react-helmet';

export const StaffPage = (): ReactElement => {
  return (
    <>
      <Helmet>
        <title>Staff - Answer King</title>
      </Helmet>
      <div className="staff mw-960">
        <h1>Staff</h1>
        <h2>Items</h2>
        <ItemCreateForm />
        <ItemsTable />
      </div>
    </>
  );
};
