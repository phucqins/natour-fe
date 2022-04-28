import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import displayMap, { paragraphSlicer, pictureHelper } from "../utils/utils";
import axios from "axios";

import icon from "../assets/img/icons.svg";
import logoWhite from "../assets/img/logo-white.png";

import Helmet from "../components/Helmet";
import OverViewDetails from "../components/OverViewDetails";
import TourGuides from "../components/TourGuides";
import ReviewCard from "../components/ReviewCard";
import Loading from "../components/Loading";

import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

const TourDetail = () => {
  const { id } = useParams();
  const [tour, setTourDetail] = useState(null);
  const fetchTourDetail = async (id) => {
    try {
      const url = `https://phucnq-natour.herokuapp.com/api/v1/tours/${id}`;

      const res = await fetch(url);
      const data = await res.json();
      setTourDetail(data.data.data);
      displayMap(data.data.data.locations, mapboxgl);
    } catch (err) {
      console.error(err);
    }
  };

  const tourBookingHandler = async () => {
    await axios(
      `https://phucnq-natour.herokuapp.com/api/v1/bookings/checkout-session/${id}`
    );
  };

  useEffect(() => {
    fetchTourDetail(id);
  }, [id]);

  if (!tour) {
    return <Loading />;
  } else {
    return (
      <Helmet title={tour.name}>
        <section className="section-header">
          <div className="header__hero">
            <div className="header__hero-overlay">&nbsp;</div>
            <img
              className="header__hero-img"
              src={`https://phucnq-natour.herokuapp.com/img/tours/${tour.imageCover}`}
              alt={`${tour.name}`}
            />
          </div>
          <div className="heading-box">
            <h1 className="heading-primary">
              <span>{tour.name}</span>
            </h1>
            <div className="heading-box__group">
              <div className="heading-box__detail">
                <svg className="heading-box__icon">
                  <use xlinkHref={`${icon}#icon-clock`} />
                </svg>
                <span className="heading-box__text">
                  {tour.duration}&nbsp;&nbsp;days
                </span>
              </div>
              <div className="heading-box__detail">
                <svg className="heading-box__icon">
                  <use xlinkHref={`${icon}#icon-map-pin`} />
                </svg>
                <span className="heading-box__text">
                  {tour.startLocation.description}
                </span>
              </div>
            </div>
          </div>
        </section>
        <section className="section-description">
          <div className="overview-box">
            <div>
              <div className="overview-box__group">
                <h2 className="heading-secondary ma-bt-lg">Quick facts</h2>
                <OverViewDetails
                  label="Next date"
                  icon="calendar"
                  text={new Date(tour.startDates[0]).toLocaleString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                />
                <OverViewDetails
                  label="Difficulty"
                  icon="trending-up"
                  text={tour.difficulty}
                />
                <OverViewDetails
                  label="Participants"
                  icon="user"
                  text={`${tour.maxGroupSize} people`}
                />
                <OverViewDetails
                  label="Rating"
                  icon="star"
                  text={`${tour.ratingsAverage} / 5`}
                />
              </div>
              <div className="overview-box__group">
                <h2 className="heading-secondary ma-bt-lg">Your tour guides</h2>
                {tour.guides.map((guide) => (
                  <TourGuides key={guide._id} guide={guide} />
                ))}
              </div>
            </div>
          </div>
          <div className="description-box">
            <h2 className="heading-secondary ma-bt-lg">
              {`About ${tour.name} tour`}
            </h2>
            <div className="description__text">
              {paragraphSlicer(tour.description)}
            </div>
          </div>
        </section>
        <section className="section-pictures">
          {pictureHelper(tour.images)}
        </section>
        <section className="section-map">
          <div id="map" />
        </section>
        <section className="section-reviews">
          <div className="reviews">
            {tour.reviews.map((review) => (
              <ReviewCard key={review._id} review={review} />
            ))}
          </div>
        </section>
        <section className="section-cta">
          <div className="cta">
            <div className="cta__img cta__img--logo">
              <img src={logoWhite} alt="Natours logo" className />
            </div>
            <img
              src={`https://phucnq-natour.herokuapp.com/img/tours/${tour.images[1]}`}
              alt=""
              className="cta__img cta__img--1"
            />
            <img
              src={`https://phucnq-natour.herokuapp.com/img/tours/${tour.images[2]}`}
              alt=""
              className="cta__img cta__img--2"
            />
            <div className="cta__content">
              <h2 className="heading-secondary">What are you waiting for?</h2>
              <p className="cta__text">
                {`${tour.duration} days. 1 adventure. Infinite memories. Make it yours today!`}
              </p>
              <button
                onClick={tourBookingHandler}
                className="btn btn--green span-all-rows"
              >
                Book tour now!
              </button>
            </div>
          </div>
        </section>
      </Helmet>
    );
  }
};

export default TourDetail;
