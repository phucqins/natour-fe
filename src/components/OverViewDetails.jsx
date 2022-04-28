import React from 'react';
import icon from '../assets/img/icons.svg';

const OverViewDetails = (props) => {
  return (
    <div className="overview-box__detail">
      <svg className="overview-box__icon">
        <use xlinkHref={`${icon}#icon-${props.icon}`} />
      </svg>
      <span className="overview-box__label">{props.label}</span>
      <span className="overview-box__text">{props.text}</span>
    </div>
  );
};

export default OverViewDetails;
