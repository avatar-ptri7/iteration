import React, { useState, useEffect } from 'react';
import JobCard from './userComponents/JobCard.jsx';
import Columns from './userComponents/Columns.jsx';
import { statuses } from '../data/mock.js';
import DropWrapper from './userComponents/DropWrapper.jsx';
import axios from 'axios';

function User(props) {
  const [jobs, setJobs] = useState([]);



  const setStatus = (job_id, item, status) => {
    console.log('setStatus', job_id, item, status);
    axios
      .post('/users/updatestatus', {
        job_id: `${job_id}`,
        status: `${status}`,
      })
      .then((response) => console.log('axios post response', response))
      .then(() => {
        setJobs((prevState) => {
          const newItems = prevState
            .filter((i) => i.job_id !== job_id)
            .concat({ ...item, status });
          console.log('Job Updated', newItems);
          return [...newItems];
        });
      });
  };
  // const delJobs = (job_id, item, status) => {
  //   // console.log('setStatus', job_id, item, status);

  //   axios
  //     .post('/users/deletejob', {
  //       id: `${job_id}`,
  //     })
  //     .then((response) => console.log(response))
      
  //     .then(() => {
  //       setJobs((prevState) => {
  //         const newItems = prevState
  //           .filter((i) => i.job_id !== job_id)
  //           .concat({ ...item, status });
  //         console.log("Jobs before Delete", prevState)
  //         console.log('Jobs Updated', newItems);
  //         return [...newItems];
  //       })
  //       .catch((err) => console.log('Error inside of handleDelete button'))
  //     });
  // };
  let data;
  //Grabbing our data from the database
  useEffect((item) => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/users/getalljobs');
        console.log('response inside of useeffect--->', response)
        setJobs(response.data);
       
        data= response.data;
        console.log('data in User useEffect--->', data);
        //jobInfoStatus = response.data.rows.ra
      //   const jobInfo = await axios.post('/users/getJobInfo', {
      //     id: `${item.job_id}`
      //   });
      //   console.log('jobINfo----->', jobInfo);
      //   // jobInfoStatus = jobInfo.status;
      //   // jobInfoDate = jobInfo.data;
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);

  //onDrop function. Update job item with new status in database
  const onDrop = (item, monitor, status) => {
    axios
      .post('/users/updatestatus', {
        job_id: `${item.job_id}`,
        status: `${status}`,
      })
      .then((response) => console.log('axios post response', response))
      .then(() => {
        setJobs((prevState) => {
          const newItems = prevState
            .filter((i) => i.job_id !== item.job_id)
            .concat({ ...item, status });
          return [...newItems];
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //dragging function
  const moveItem = (dragIndex, hoverIndex) => {
    const item = jobs[dragIndex];
    setJobs((prevState) => {
      const newItems = prevState.filter((i, idx) => idx !== dragIndex);
      newItems.splice(hoverIndex, 0, item);
      return [...newItems];
    });
  };

  //rendering logic
  if (jobs.length) {
    return (
      <div className={'row'}>
        {statuses.map((s) => {
          return (
            <div key={s.status} className={'col-wrapper'}>
              <h2 className={'col-header'}>{s.status_name}</h2>
              <DropWrapper onDrop={onDrop} status={s.status}>
                <Columns>
                  {jobs
                    .filter((i) => i.status === s.status)
                    .map((i, idx) => {
                      return (
                        <JobCard
                          key={i.job_id}
                          item={i}
                          index={idx}
                          moveItem={moveItem}
                          status={s}
                          setStatus={setStatus}
                          jobInfo={jobs}
                          
                          
                        />
                      );
                    })}
                </Columns>
              </DropWrapper>
            </div>
          );
        })}
      </div>
    );
  } else
    return (
      <div className={'row'}>
        {statuses.map((s) => {
          return (
            <div key={s.status} className={'col-wrapper'}>
              <h2 className={'col-header'}>{s.status_name}</h2>
              <DropWrapper onDrop={onDrop} status={s.status}>
                <Columns></Columns>
              </DropWrapper>
            </div>
          );
        })}
      </div>
    );
}

export default User;
