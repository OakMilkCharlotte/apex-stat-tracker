import React from 'react';

const AvgRPPerComp = ({ data }) => {
  return (
    <div>
      <h2>Average RP Per Comp</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default AvgRPPerComp;
