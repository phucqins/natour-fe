import React from 'react';
import icon from '../assets/img/icons.svg';

import { Link } from 'react-router-dom';

const OverView = (props) => {
  const tour = props.tour;

  return (
    <div className="card">
      <div className="card__header">
        <div className="card__picture">
          <div className="card__picture-overlay">&nbsp;</div>
          <img
            src={`https://phucnq-natour.herokuapp.com/img/tours/${tour.imageCover}`}
            alt={`${tour.name}`}
            className="card__picture-img"
          />
        </div>

        <h3 className="heading-tertirary">
          <span>{tour.name}</span>
        </h3>
      </div>

      <div className="card__details">
        <h4 className="card__sub-heading">
          {`${tour.difficulty} ${tour.duration}-day tour`}
        </h4>
        <p className="card__text">{tour.summary}</p>
        <div className="card__data">
          <svg className="card__icon">
            <use xlinkHref={`${icon}#icon-map`} />
          </svg>
          <span>{tour.startLocation.description}</span>
        </div>
        <div className="card__data">
          <svg className="card__icon">
            <use xlinkHref={`${icon}#icon-calendar`} />
          </svg>
          <span>
            {new Date(tour.startDates[0]).toLocaleString('en-US', {
              month: 'long',
              year: 'numeric',
            })}
          </span>
        </div>
        <div className="card__data">
          <svg className="card__icon">
            <use xlinkHref={`${icon}#icon-flag`} />
          </svg>
          <span>{`${tour.locations.length} stops`}</span>
        </div>
        <div className="card__data">
          <svg className="card__icon">
            <use xlinkHref={`${icon}#icon-user`} />
          </svg>
          <span>{`${tour.maxGroupSize} people`}</span>
        </div>
      </div>

      <div className="card__footer">
        <p>
          <span className="card__footer-value">{`$${tour.price}`}</span>
          &nbsp;
          <span className="card__footer-text">per person</span>
        </p>
        <p className="card__ratings">
          <span className="card__footer-value">{tour.ratingsAverage}</span>
          &nbsp;
          <span className="card__footer-text">{`rating(${tour.ratingsQuantity})`}</span>
        </p>
        <Link to={`/tours/${tour.id}`} className="btn btn--green btn--small">
          Details
        </Link>
      </div>
    </div>
  );
};

export default OverView;
