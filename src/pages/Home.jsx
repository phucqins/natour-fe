import React, { useEffect, useState } from "react";

import Loading from "../components/Loading";
import Helmet from "../components/Helmet";
import OverView from "../components/OverView";

const Home = () => {
  const [tours, setTours] = useState(null);

  const fetchTours = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    setTours(data.data.data);
  };

  useEffect(() => {
    fetchTours("https://phucnq-natour.herokuapp.com/api/v1/tours");
  }, []);

  if (!tours) {
    return <Loading />;
  } else {
    return (
      <Helmet title="Tours">
        <main className="main">
          <div className="card-container">
            {tours.map((tour) => (
              <OverView key={tour.id} tour={tour} />
            ))}
          </div>
        </main>
        ;
      </Helmet>
    );
  }
};

export default Home;
