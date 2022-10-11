import './LoaderOverlay.scss';
import cn from 'classnames';
import React, { ReactElement } from 'react';

interface Props {
  isEnabled: boolean;
}

export const LoaderOverlay = ({ isEnabled }: Props): ReactElement => {
  return (
    <div className={cn('loading_overlay', { 'loading_overlay--enabled': isEnabled })}>
      <div className="loading_overlay__icon la-ball-grid-beat">
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};
