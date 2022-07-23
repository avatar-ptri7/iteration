import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
//import { DropdownDate, DropdownComponent } from 'react-dropdown-date';
const Calendar = ({ id, jobInfo }) => {
  let jobDate;
  let dateJob;
  useEffect( () => {
    console.log('data---->', jobInfo);
    handleInterviewDate()
    
  }, [])
  const handleInterviewDate = async () => {
    for(let i = 0; i < jobInfo.length; i++){
      if(jobInfo[i].job_id === id){
        console.log('found id ----> ', id)
        jobDate = jobInfo[i].interview_date;
        console.log('jobdate-----', jobDate);
        console.log(typeof jobDate);
        dateJob = new Date(jobDate)
        await setStartDate(dateJob)
      }
  }

}
  const [startDate, setStartDate] = useState(new Date());
  // const [selectedDate, setSelectedDate] = useState(null);
  // let interviewDate = selectedDate;
  const handleDateSelect =  (date) => {
    console.log('inside of calendar newDate ----->', typeof newDate);
      axios.post('/users/addtime', {
        id: `${id}`,
        date : `${date.toLocaleDateString()}`
      })
      .then(response => console.log(response))
      .catch(err => console.log('Error inside of Calendar handleDateSelect'));
  }
  return (
    <div className='calendar-holder'>
      {' '}
      Date Applied To Job
      <DatePicker
        selected={startDate}
        onSelect={handleDateSelect}
        onChange={(date) => {
          console.log(date);
          handleDateSelect(date);
        }}
      />
    </div>
  );
  //   <DatePicker
  //     selected={startDate}
  //     onChange={(date) => setStartDate(date)}
  //   />
};
export default Calendar;