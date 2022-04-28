import React from 'react';

const TourGuides = (props) => {
  const guide = props.guide;
  return (
    <div className="overview-box__detail">
      <img
        src={`https://phucnq-natour.herokuapp.com/img/users/${guide.photo}`}
        alt={guide.name}
        className="overview-box__img"
      />
      <span className="overview-box__label">
        {guide.role === 'guide' ? 'Tour guide' : 'Lead guide'}
      </span>
      <span className="overview-box__text">{guide.name}</span>
    </div>
  );
};

export default TourGuides;
