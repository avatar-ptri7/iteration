import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import JobCard from './userComponents/JobCard.jsx';
import Columns from './userComponents/Columns.jsx';
import { statuses } from '../data/mock.js';
import DropWrapper from './userComponents/DropWrapper.jsx';
import axios from 'axios';
import JobSwipe from './JobSwipe.jsx';
import { useAuth } from './Auth.jsx';
import HomePage from './HomePage.jsx';


function User(props) {

  const [jobs, setJobs] = useState([]);
  let auth = useAuth();
  let navigate = useNavigate();

  //Grabbing our data from the database
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/users/getalljobs');
        console.log("axios response", response)
        setJobs(response.data);
      } catch (error) {
        console.error(error.message);
      }
    }

    fetchData();
  }, []);

  const onLogout = () => {
    auth.signout(() => {
      navigate('/', { replace: true });
    });
  };

  //onDrop function. Update job item with new status in database
  const onDrop = (item, monitor, status) => {
    axios.post('/users/updatestatus', {
      job_id: `${item.job_id}`,
      status: `${status}`
    }).then(response => console.log("axios post response", response))
      .then(setJobs(prevState => {
        const newItems = prevState
          .filter(i => i.job_id !== item.job_id)
          .concat({ ...item, status })
        return [...newItems];
      }))
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
    console.log(jobs)
    return (
      <>
        <nav>
          <Link to='/job-swipe' style={{ textAlign: 'center', margin: '0 auto' }}>Job Swipe</Link> {" | "}
          <Link to='/' style={{ textAlign: 'center', margin: '0 auto' }} onClick={onLogout}>Logout</Link>
        </nav>
        <div className={"row"}>
          {statuses.map(s => {
            return (
              <div key={s.status} className={"col-wrapper"}>
                <h2 className={'col-header'}>{s.status_name}</h2>
                <DropWrapper onDrop={onDrop} status={s.status}>
                  <Columns>
                    {jobs.filter(i => i.status === s.status)
                      .map((i, idx) => {
                        return <JobCard key={i.job_id} item={i} index={idx} moveItem={moveItem} status={s} />
                      })}
                  </Columns>
                </DropWrapper>
              </div>
            )
          }
          )}
        </div>
      </>
    )
  } else return <div>Loading</div> // when it's a new user (aka jobs.length === 0), stuck on rendering this page
}

export default User;
