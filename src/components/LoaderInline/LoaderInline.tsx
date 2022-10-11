import './LoaderInline.scss';
import React, { ReactElement } from 'react';

export const LoaderInline = (): ReactElement => {
  return (
    <div className="loader_inline">
      <div className="loader_inline__icon la-ball-beat">
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};
