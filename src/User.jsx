import React, { useState, useEffect } from 'react';
import JobCard from './userComponents/JobCard.jsx';
import Columns from './userComponents/Columns.jsx';
import { statuses } from '../data/mock.js';
import DropWrapper from './userComponents/DropWrapper.jsx';
import axios from 'axios';

function User(props) {

  const [jobs, setJobs] = useState([]);


  const setStatus = (job_id, item, status) => {
    console.log("setStatus", job_id, item, status)
    axios.post('/users/updatestatus', {
      job_id: `${job_id}`,
      status: `${status}`
    }).then(response => console.log("axios post response", response))
      .then(() => {

        setJobs(prevState => {
          const newItems = prevState
            .filter(i => i.job_id !== job_id)
            .concat({ ...item, status })
          console.log("Job Updated", newItems)
          return [...newItems];

        })
      })
  };




  //Grabbing our data from the database
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/users/getalljobs');
        setJobs(response.data);
      } catch (error) {
        console.error(error.message);
      }
    }

    fetchData();
  }, []);


  //onDrop function. Update job item with new status in database
  const onDrop = (item, monitor, status) => {
    axios.post('/users/updatestatus', {
      job_id: `${item.job_id}`,
      status: `${status}`
    }).then(response => console.log("axios post response", response))
      .then(() => {

        setJobs(prevState => {
          const newItems = prevState
            .filter(i => i.job_id !== item.job_id)
            .concat({ ...item, status })
          return [...newItems];

        })

      })
      .catch(function (error) {
        console.log(error)
      });
  };

  //dragging function
  const moveItem = (dragIndex, hoverIndex) => {
    const item = jobs[dragIndex];
    setJobs(prevState => {
      const newItems = prevState.filter((i, idx) => idx !== dragIndex)
      newItems.splice(hoverIndex, 0, item);
      return [...newItems];
    });
  };

  //rendering logic
  if (jobs.length) {

    return (
      <div className={"row"}>
        {statuses.map(s => {
          return (
            <div key={s.status} className={"col-wrapper"}>
              <h2 className={'col-header'}>{s.status_name}</h2>
              <DropWrapper onDrop={onDrop} status={s.status}>
                <Columns>
                  {jobs.filter(i => i.status === s.status)
                    .map((i, idx) => {

                      return <JobCard key={idx} item={i} index={idx} moveItem={moveItem} status={s} setStatus={setStatus} />
                    })}
                </Columns>
              </DropWrapper>
            </div>
          )
        })}
      </div>
    )
  } else return (
    <div className={"row"}>
      {statuses.map(s => {
        return (
          <div key={s.status} className={"col-wrapper"}>
            <h2 className={'col-header'}>{s.status_name}</h2>
            <DropWrapper onDrop={onDrop} status={s.status}>
              <Columns>
              </Columns>
            </DropWrapper>
          </div>
        )
      })}
    </div>
  )
}

export default User;
