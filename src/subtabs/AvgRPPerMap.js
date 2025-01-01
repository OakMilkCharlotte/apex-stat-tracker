import React from 'react';

const AvgRPPerMap = ({ data }) => {
  return (
    <div>
      <h2>Average RP Per Map</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default AvgRPPerMap;
