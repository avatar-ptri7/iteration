import React, { useState } from 'react';
import axios from 'axios';

const ButtonApply = ({ url, id, item, status, setStatus }) => {
  const [newStatus, setNewStatus] = useState(status);
  const handleSubmit = () => {

    setStatus(id, item, 2)
    window.open(url, '_blank');
    // console.log('status----->', status);
    // axios
    //   .post('/users/apply', {
    //     id: `${id}`,
    //     status: `${status.status}`,
    //   })
    //   .then((response) => {
    //     console.log('newStatus------->', response);
    //     setStatus(response);
    //     setNewStatus(response);
    //   })
    //   .catch((err) => console.log('Error in ButtonApply'));
  };

  return (
    <button
      style={{ width: '100px', alignSelf: 'center', borderRadius: '8px' }}
      onClick={handleSubmit}
    >
      Apply
    </button>
  );
};
export default ButtonApply;
