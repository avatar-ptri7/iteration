import axios from 'axios';
import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';
const ButtonDelete = ({ id, item, status }) => {
  const handleDelete = (e) => {
    console.log('e----->', e);
    e.stopPropagation();
    //if (window.confirm('Are you sure you want to delete')) {
    //delJob(id, item, status);
    //}
    if (window.confirm('Are you sure you want to delete')) {
      // delJobs(id, item, status);
      axios
        .post('/users/deletejob', {
          id: `${id}`,
        })
        // .then(() => {
        //   console.log('hi----->')
        //   setJobs((prevState) => {
        //     console.log('inside of setJobs----->');
        //     const newItems = prevState.filter((job) => job.id !== id)
        //     .concat({ ...item, status })
        //     console.log('newItems in deleteButton ----->', newItems);
        //     return [...newItems];
        //   });
        // })
        .catch((err) => console.log('Error inside of handleDelete button'));
    }
    window.location.reload(false);
  };
  return (
    <button className='del-btn'>
      <FaTrashAlt onClick={handleDelete} />
    </button>
  );
};
export default ButtonDelete;
