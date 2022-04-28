import React, { useEffect } from 'react';

const Helmet = (props) => {
  document.title = 'Natours - ' + props.title;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <div>{props.children}</div>;
};

export default Helmet;
