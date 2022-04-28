import React from 'react';
import Helmet from '../components/Helmet';

const Loading = () => {
  return (
    <Helmet title="Loading">
      <div id="loading">
        <div id="loading__spinner"></div>
      </div>
    </Helmet>
  );
};

export default Loading;
