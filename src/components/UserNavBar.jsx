import React from 'react';
import { Link } from 'react-router-dom';
import icon from '../assets/img/icons.svg';

const UserNavBar = () => {
  return (
    <ul className="side-nav">
      <li className="side-nav--active">
        <Link to="#">
          <svg>
            <use xlinkHref={`${icon}#icon-settings`} />
          </svg>
          Settings
        </Link>
      </li>
      <li>
        <Link to="/my-tours">
          <svg>
            <use xlinkHref={`${icon}#icon-briefcase`} />
          </svg>
          My bookings
        </Link>
      </li>
      <li>
        <Link to="#">
          <svg>
            <use xlinkHref={`${icon}#icon-star`} />
          </svg>
          My reviews
        </Link>
      </li>
      <li>
        <Link to="#">
          <svg>
            <use xlinkHref={`${icon}#icon-credit-card`} />
          </svg>
          Billing
        </Link>
      </li>
    </ul>
  );
};

export default UserNavBar;
