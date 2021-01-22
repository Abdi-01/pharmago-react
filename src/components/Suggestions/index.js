import React from 'react';

const Suggestions = ({ results }) => {
  return (
    <div>
      {results.map((item) => (
        <div key={item.idproduct}>
          <p>
            {item.name}-{item.price}
          </p>
          <p></p>
        </div>
      ))}
    </div>
  );
};

export default Suggestions;
