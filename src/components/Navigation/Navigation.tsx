import './Navigation.scss';
import AnswerLogo from 'assets/answer_logo.png';
import { Button } from 'components/Button/Button';
import { useOrder } from 'hooks/useOrder';
import React, { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import { RouteConstants } from 'utilities/route-constants';

interface Props {
  toggleOrderPanel(): void;
  orderPanelIsOpen: boolean;
}

export const Navigation = ({ toggleOrderPanel, orderPanelIsOpen }: Props): ReactElement => {
  const { order } = useOrder();

  return (
    <nav className="nav">
      <div className="nav__items nav__section">
        <NavLink activeClassName="nav__item--active" className="nav__item" exact to={RouteConstants.HOME}>
          Home
        </NavLink>
        <NavLink activeClassName="nav__item--active" className="nav__item" to={RouteConstants.MENU}>
          Menu
        </NavLink>
        <NavLink activeClassName="nav__item--active" className="nav__item" to={RouteConstants.STAFF}>
          Staff
        </NavLink>
      </div>
      <div className="nav__section">
        <img alt="Logo" className="nav__logo" src={AnswerLogo} />
      </div>

      <div className="nav__section">
        <Button active={orderPanelIsOpen || order.isFetched} className="nav__order_total" onClick={toggleOrderPanel}>
          {order.isFetched ? '£' + order.data?.total : null}
          {order.isIdle ? 'Place an order' : null}
        </Button>
      </div>
    </nav>
  );
};
