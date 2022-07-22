import React from 'react';


const ButtonApply = ({ url, id, item, setStatus }) => {
  
  const handleSubmit = () =>{
    setStatus(id, item, 2)
    window.open(url, '_blank');
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
