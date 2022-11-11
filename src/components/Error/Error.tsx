import './Error.scss';
import { ReactElement, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  onClear?: () => void;
}

export const Error = ({ children, onClear = undefined }: Props): ReactElement => {
  return (
    <div className="error">
      {onClear ? (
        <div
          className="error__close"
          data-testid="error-clear"
          onClick={onClear}
          onKeyDown={onClear}
          role="button"
          tabIndex={0}
        >
          &times;
        </div>
      ) : null}
      <div className="error__title">Error(s):</div>
      <ul data-testid="error-list">{children ?? 'An unexpected error has occurred.'}</ul>
    </div>
  );
};
