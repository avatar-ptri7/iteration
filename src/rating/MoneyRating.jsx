import React from 'react';
import { FaMoneyBill } from 'react-icons/fa';


const MoneyRating = ({ moneyCount, rating, setRating, hover, setHover, id }) => {
  
  
    const submitRating = async () => {
     await setRating(moneyCount);
    fetch('', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id,
            rating

        })
        .then(data => data.json())
        .then(data => {
            setRating(moneyCount)
        })
        .catch((e) => {
            console.log({e});
        })
    })
  };
  return (
    <div>
      <form>
        <label>
          <input
            type='radio'
            name='rating'
            value={moneyCount}
            onClick={() => setRating(moneyCount)}
          />
          <FaMoneyBill
            rating={rating}
            onMouseEnter={() => setHover(moneyCount)}
            onMouseLeave={() => setHover(null)}
            color={moneyCount <= (hover || rating) ? '#85BB65' : '#D3D3D3'}
          />
        </label>
      </form>
    </div>
  );
};

export default MoneyRating;