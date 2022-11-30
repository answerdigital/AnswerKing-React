import './Navigation.scss';
import AnswerLogo from 'assets/answer_logo.png';
import { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import { RouteConstants } from 'utilities/route-constants';
import cn from 'classnames';

export const Navigation = (): ReactElement => {
  return (
    <nav className="nav">
      <div className="nav__items nav__section">
        <NavLink className={({ isActive }) => cn('nav__item', { 'nav__item--active': isActive })} end to={RouteConstants.HOME}>
          Home
        </NavLink>
        <NavLink className={({ isActive }) => cn('nav__item', { 'nav__item--active': isActive })} to={RouteConstants.MENU}>
          Menu
        </NavLink>
        <NavLink className={({ isActive }) => cn('nav__item', { 'nav__item--active': isActive })} to={RouteConstants.STAFF}>
          Staff
        </NavLink>
      </div>
      <div className="nav__section">
        <img alt="Logo" className="nav__logo" src={AnswerLogo} />
      </div>
    </nav>
  );
};
