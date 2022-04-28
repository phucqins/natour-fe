import React from 'react';
import { Link } from 'react-router-dom';
import icon from '../assets/img/icons.svg';

const AdminNavBar = () => {
  return (
    <div className="admin-nav">
      <h5 className="admin-nav__heading">Admin</h5>
      <ul className="side-nav">
        <li>
          <Link to="#">
            <svg>
              <use xlinkHref={`${icon}#icon-map`} />
            </svg>
            Manage tours
          </Link>
        </li>
        <li>
          <Link to="#">
            <svg>
              <use xlinkHref={`${icon}#icon-users`} />
            </svg>
            Manage users
          </Link>
        </li>
        <li>
          <Link to="#">
            <svg>
              <use xlinkHref={`${icon}#icon-star`} />
            </svg>
            Manage reviews
          </Link>
        </li>
        <li>
          <Link to="#">
            <svg>
              <use xlinkHref={`${icon}#icon-briefcase`} />
            </svg>
            Manage bookings
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminNavBar;
