
import React, { useState } from 'react';
import MoneyRating from './MoneyRatingComponent';

const MoneyHolder = ({ id }) => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  return (
    <div>
      {[...Array(5)].map((item, i) => (
        <MoneyRating
          moneyCount={i + 1}
          rating={rating}
          setRating={setRating}
          hover={hover}
          setHover={setHover}
          id={id}
        />
      ))}
    </div>
  );
};
export default MoneyHolder;