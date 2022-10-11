import './NavigationMobile.scss';
import IconHome from 'assets/icon_home.svg';
import IconMenu from 'assets/icon_menu.svg';
import IconStaff from 'assets/icon_staff.svg';
import { Button } from 'components/Button/Button';
import { useOrder } from 'hooks/useOrder';
import React, { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import { RouteConstants } from 'utilities/route-constants';

interface Props {
  toggleOrderPanel(): void;
}

export const NavigationMobile = ({ toggleOrderPanel }: Props): ReactElement => {
  const { order } = useOrder();

  return (
    <nav className="mobile_nav">
      <Button className="mobile_nav__basket" onClick={toggleOrderPanel} type="button">
        {order.isFetched ? (
          <div className="mobile_nav__basket_total">
            <span>Order Total:</span>
            <span>{`£${order.data?.total}`}</span>
          </div>
        ) : null}
        {order.isIdle ? <span>Place an order</span> : null}
      </Button>
      <div className="mobile_nav__items">
        <NavLink activeClassName="mobile_nav__item--active" className="mobile_nav__item" exact to={RouteConstants.HOME}>
          <img alt="Home Icon" className="mobile_nav__icon" src={IconHome} />
          <div className="mobile_nav__label">Home</div>
        </NavLink>
        <NavLink activeClassName="mobile_nav__item--active" className="mobile_nav__item" to={RouteConstants.MENU}>
          <img alt="Home Icon" className="mobile_nav__icon" src={IconMenu} />
          <div className="mobile_nav__label">Menu</div>
        </NavLink>
        <NavLink activeClassName="mobile_nav__item--active" className="mobile_nav__item" to={RouteConstants.STAFF}>
          <img alt="Home Icon" className="mobile_nav__icon" src={IconStaff} />
          <div className="mobile_nav__label">Staff</div>
        </NavLink>
      </div>
    </nav>
  );
};
