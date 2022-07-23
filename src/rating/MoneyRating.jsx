import React from 'react';
import { IconContext } from 'react-icons';
import { FaMoneyBill } from 'react-icons/fa';


const MoneyRating = ({
  moneyCount,
  rating,
  setRating,
  hover,
  setHover,
  id,
}) => {
  // const handleChange =  (e) => {

  //   setRating(e.target.value)

  //   console.log('rating submitRating----->', rating);
  //   console.log( typeof(id));

    // axios.post('/users/rank', {
    //   "id" : `${id}`,
    //   "rating": `${rating}`
    // }).then(response => {
    //    console.log('response from DB ----->', response);
    // }).catch(err => console.log('Error in MoneyRating Component'));
  //};


  // useEffect(() => {
  //   axios
  //     .post('/users/rank', {
  //       id: `${id}`,
  //       rating: `${rating}`,
  //     })
  //     .then((response) => {
  //       console.log('response from DB ----->', response);
  //     })
  //     .catch((err) => console.log('Error in MoneyRating Component'));
  // }, [rating]);

  return (
    // <FaMoneyBill
    //   className='money'
    //   rating={rating}
    //   onMouseEnter={() => setHover(moneyCount)}
    //   onMouseLeave={() => setHover(null)}
    //   color={moneyCount <= (hover || rating) ? '#85BB65' : '#D3D3D3'}
    //   onClick={setRating(moneyCount)}
    // />
    <>
      {/* <form>
        <label>
          <input
            type='radio'
            name='rating'
            checked={null}
            value={moneyCount}
            onClick= {handleChange}
          /> */}
          <IconContext.Provider value={{size: 50}}>
          <FaMoneyBill
            value= { {size: 70}}
            name='rating'
            className='money'
            rating={rating}
            onMouseEnter={() => setHover(moneyCount)}
            onMouseLeave={() => setHover(null)}
            color={moneyCount <=  (hover || rating) ? '#85BB65' : '#D3D3D3'}
            onClick={() =>{
              console.log('hello test');
              return setRating(moneyCount)}}
          />
          </IconContext.Provider>
        {/* </label>
        </form> */}

    </>
  );
};

export default MoneyRating;
