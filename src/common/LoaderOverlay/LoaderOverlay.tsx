import './LoaderOverlay.scss';
import { ReactElement } from 'react';
import cn from 'classnames';

interface Props {
  isEnabled: boolean;
}

export default function LoaderOverlay({ isEnabled }: Props): ReactElement {
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
}
