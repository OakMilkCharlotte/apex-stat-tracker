import React from 'react';

const RPOverSplit = ({ data }) => {
  return (
    <div>
      <h2>RP Over Split</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default RPOverSplit;
