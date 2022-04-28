import React from 'react';
import { ratingHelper } from '../utils/utils';

const ReviewCard = (props) => {
  const { user, review, rating } = props.review;
  return (
    <div className="reviews__card">
      <div className="reviews__avatar">
        <img
          src={`https://phucnq-natour.herokuapp.com/img/users/${user.photo}`}
          alt={user.name}
          className="reviews__avatar-img"
        />
        <h6 className="reviews__user">{user.name}</h6>
      </div>
      <p className="reviews__text">{review}</p>
      <div className="reviews__rating">{ratingHelper(rating)}</div>
    </div>
  );
};

export default ReviewCard;
