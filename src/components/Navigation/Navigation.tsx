import './Navigation.scss';
import AnswerLogo from 'assets/answer_logo.png';
import { Button } from 'components/Button/Button';
import { useOrder } from 'hooks/useOrder';
import { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import { RouteConstants } from 'utilities/route-constants';
import cn from 'classnames';

interface Props {
  toggleOrderPanel(): void;
  orderPanelIsOpen: boolean;
}

export const Navigation = ({ toggleOrderPanel, orderPanelIsOpen }: Props): ReactElement => {
  const { order } = useOrder();

  return (
    <nav className="nav">
      <div className="nav__items nav__section">
        <NavLink
          className={({ isActive }) => cn('nav__item', { 'nav__item--active': isActive })}
          end
          to={RouteConstants.HOME}
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) => cn('nav__item', { 'nav__item--active': isActive })}
          to={RouteConstants.MENU}
        >
          Menu
        </NavLink>
        <NavLink
          className={({ isActive }) => cn('nav__item', { 'nav__item--active': isActive })}
          to={RouteConstants.STAFF}
        >
          Staff
        </NavLink>
      </div>
      <div className="nav__section">
        <img alt="Logo" className="nav__logo" src={AnswerLogo} />
      </div>

      <div className="nav__section">
        <Button active={orderPanelIsOpen || order.isFetched} className="nav__order_total" onClick={toggleOrderPanel}>
          {order.isFetched ? '£' + order.data?.orderTotal : null}
          {order.isIdle ? 'Place an order' : null}
        </Button>
      </div>
    </nav>
  );
};
