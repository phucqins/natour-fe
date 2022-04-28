/* eslint-disable */
import axios from "axios";
import icon from "../assets/img/icons.svg";

const displayMap = (locations, mapboxgl) => {
  mapboxgl.accessToken =
    "pk.eyJ1IjoicGh1Y3EtaW5zIiwiYSI6ImNreWJqMm1tdDBmdjcyb2s0czU2MWF2b20ifQ.RUCZulpyCkgovquNycl82g";
  var map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/phucq-ins/ckzv24fkt007u14jyc7mc1nhg",
    scrollZoom: false,
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    // Create marker
    const el = document.createElement("div");
    el.className = "marker";

    // Add marker
    new mapboxgl.Marker({
      element: el,
      anchor: "bottom",
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add popup
    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    // Extend map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};

const updateSettings = async (data, type, token) => {
  try {
    const url =
      type === "password"
        ? "https://phucnq-natour.herokuapp.com/api/v1/users/updateMyPassword"
        : "https://phucnq-natour.herokuapp.com/api/v1/users/updateMe";

    const res = await axios({
      method: "PATCH",
      url,
      data,
      headers: {
        Authorization: `Bearer ${token}`,
        // 'content-type': 'multipart/form-data',
      },
    });

    if (res.data.status === "success") {
      showAlert("success", `${type.toUpperCase()} updated successfully!`);
      return res.data;
    }
  } catch (err) {
    err.response;
    showAlert("error", err.response.data.message);
  }
};

const paragraphSlicer = (data) => {
  return data.split("\n").map((p, i) => <Paragraph key={i} p={p} />);
};

const pictureHelper = (data) => {
  return data.map((el, i) => <PictureBox key={i} i={i} img={el} />);
};

const ratingHelper = (data) => {
  return [1, 2, 3, 4, 5].map((el) => <Rating key={el} rating={data} i={el} />);
};

const Paragraph = (props) => {
  return <p className="description__text">{props.p}</p>;
};

const Rating = (props) => {
  const { rating, i } = props;
  return (
    <svg
      className={`reviews__star reviews__star--${
        rating >= i ? "active" : "inactive"
      }`}
    >
      <use xlinkHref={`${icon}#icon-star`} />
    </svg>
  );
};
const PictureBox = (props) => {
  const { i, img } = props;
  return (
    <div className="picture-box">
      <img
        className={`picture-box__img picture-box__img--${i + 1}`}
        src={`https://phucnq-natour.herokuapp.com/img/tours/${img}`}
        alt={img}
      />
    </div>
  );
};

const hideAlert = () => {
  const el = document.querySelector(".alert");
  if (el) el.parentElement.removeChild(el);
};

// type is 'success' or 'error'
const showAlert = (type, msg, time = 7) => {
  hideAlert();
  const markup = `<div class="alert alert--${type}">${msg}</div>`;
  document.querySelector("body").insertAdjacentHTML("afterbegin", markup);
  window.setTimeout(hideAlert, time * 1000);
};

export {
  displayMap as default,
  paragraphSlicer,
  pictureHelper,
  ratingHelper,
  showAlert,
  updateSettings,
};
