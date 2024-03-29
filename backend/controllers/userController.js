const db = require("../models/userModel");
// const axios = require("axios");
const userController = {};

userController.signup = async (req, res, next) => {
    const { email } = req.body;
    const params = [email, res.locals.password]
    // this query must 1.) send a new user to the DB, 2.) bring back the _id and save it to res.locals._id
    const queryType = `INSERT INTO users (email, password) VALUES ($1, $2) RETURNING user_id`
    try {
        const values = await db.query(queryType, params)
        // are we sending anything back to the front end as a response or are we just storing the data?
        //add _id to res.locals
        res.locals.user_id = values.rows[0].user_id
        console.log('im inside userController.signup!!!!!')
        return next()
    } catch(err) {
        console.log(err)
        next({
            log: 'Error in userController.signup',
            status: 400,
            message: 'userController.signup is causing an error'
          })
    }
}

userController.saveJob = async (req, res, next) => {
  const {
    employer_name,
    employer_logo,
    employer_website,
    job_publisher,
    job_employment_type,
    job_title,
    job_apply_link,
    job_description,
    job_is_remote,
    job_posted_at_datetime_utc,
    job_city,
    job_state,
    job_country,
    job_benefits,
    job_google_link,
    job_offer_expiration_timestamp,
    job_required_experience,
    job_required_skills,
    job_required_education,
    job_min_salary,
    job_max_salary,
    job_id,
  } = req.body;

  const user_id = res.locals.user_id;

  const params = [
    employer_name,
    employer_logo,
    employer_website,
    job_publisher,
    job_employment_type,
    job_title,
    job_apply_link,
    job_description,
    job_is_remote,
    job_posted_at_datetime_utc,
    job_city,
    job_state,
    job_country,
    job_benefits,
    job_google_link,
    job_offer_expiration_timestamp,
    job_required_experience,
    job_required_skills,
    job_required_education,
    job_min_salary,
    job_max_salary,
    job_id,
    user_id,
  ];

  const queryType =
    `WITH job AS
      (INSERT INTO jobs (job_id, employer_name, employer_logo, employer_website, job_publisher, job_employment_type, job_title, job_apply_link, job_description, job_is_remote, job_posted_at_datetime_utc, job_city, job_state, job_country, job_benefits, job_google_link, job_offer_expiration_timestamp, job_required_experience, job_required_skills, job_required_education, job_min_salary, job_max_salary )
      VALUES ($22, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)
      ON CONFLICT (job_id) DO UPDATE SET employer_name = $1
      RETURNING jobs.job_id )
    INSERT INTO users_jobs (user_id, job_id) SELECT $23, job_id FROM job RETURNING user_id`;

    
  try {
    await db.query(queryType, params);
    return next();
  } catch (err) {
    next({
      log: "Error in userController.saveJob:  " + JSON.stringify(err),
      status: 400,
      message: "userController.saveJob is causing an error",
    });
  }
};

userController.getAllJobs = async (req, res, next) => {
  try {

    const user_id = res.locals.user_id;
    console.log("this is userID :", user_id);

    // query for ALL of the job_id associated with the user (user_id)
    // get all the jobs that have that job_id

    const queryType =

      "SELECT uj.user_id, uj.status, uj.rank, uj.interview_date, j.* FROM users_jobs uj RIGHT OUTER JOIN jobs j ON uj.job_id=j.job_id WHERE uj.user_id=$1";
    // returns an array full of objects that are the jobs
    const params = [user_id];

    const values = await db.query(queryType, params);
    //console.log("VALUES -> ", values)
    res.locals.values = values.rows;
    return next();
  } catch (err) {
    next({
      log: "Error in userController.getAllJobs:  " + JSON.stringify(err),
      status: 400,
      message: "userController.getAllJobs is causing an error",
    });
  }
};

userController.getJob = async (req, res, next) => {
  try {
    // retrieve from cookie later
    const user_id = res.locals.verified_id;
    // see what comes in on the body
    const job_id = req.params.id;
    // query for ALL of the job_id associated with the user (user_id)
    // get all the jobs that have that job_id

    const queryType =

      "SELECT users_jobs.user_id, users_jobs.status, jobs.* FROM users_jobs INNER JOIN jobs ON users_jobs.job_id = jobs.job_id WHERE users_jobs.user_id = $1 AND users_jobs.job_id = $2";
    // returns an array full of objects that are the jobs
    const params = [user_id, job_id];

    const values = await db.query(queryType, params);

    res.locals.values = values.rows;
    return next();
  } catch (err) {
    next({
      log: "Error in userController.getJob:  " + JSON.stringify(err),
      status: 400,
      message: "userController.getJob is causing an error",
    });
  }
};


userController.updateStatus = async (req, res, next) => {
  try{
    const { job_id, status } = req.body;
    const params = [status, job_id, res.locals.user_id];
    const queryType = 'UPDATE users_jobs SET status=$1 WHERE job_id=$2 AND user_id=$3';
    
    res.locals.job = job_id;
    
    await db.query(queryType, params);
    return next()
    
  } catch (err) {
    next({
      log: "Error in userController.updateStatus:  " + JSON.stringify(err),
      status: 400,
      message: "userController.updateStatus is causing an error",
    });
  }
}

userController.getRank = async (req, res, next) => {
  const { id } = req.query
  const queryText = `SELECT * FROM users_jobs WHERE user_id = ${res.locals.user_id} AND job_id = '${id}'`

  await db.query(queryText)
    .then((data) => {
      res.locals.data = data;
      return next();
    })
}

userController.updateRank = async (req, res, next) => {
  console.log('inside updateRank')
  const {id, rating} = req.body
  console.log(id)
  console.log('rating---->', rating);
  // const rankQuery = `select * from users_jobs where user_id =${res.locals.user_id} and job_id = '${id}'`
  const updateRankQuery = `update users_jobs set rank = ${rating} where job_id ='${id}' and user_id = ${res.locals.user_id} RETURNING *`

  //searching updating the rank of the particular job for the logged in user.
  await db.query(updateRankQuery)
    .then((data) => {
      console.log(data.rows[0].rank);
      res.locals.dbData = data.rows[0].rank
      return next();
    })
 
}
userController.applyStatus = async (req, res, next) => {
  console.log('inside of apply middleware')
  const { id, status} = req.body;
  console.log('status recieved is', status)
  let newStatus = (Number(status) + 1);
  const applyQuery = `update users_jobs set status=${newStatus} where job_id = '${id}' and user_id = ${res.locals.user_id}`;
  await db.query(applyQuery)
    db.query(`select status from users_jobs where job_id = '${id}' and user_id = ${res.locals.user_id}`)
    .then((data) => {
      console.log('status returned to the front end is', data.rows[0].status)
      res.locals.newDbStatus = data.rows[0].status;
      return next();
    })
};
userController.addDate = (req, res, next) => {
  console.log('inside addTime')
  const {date, id} = req.body;
  const timeQuery = `update users_jobs set interview_date = '${date}' where job_id = '${id}' and user_id ='${res.locals.user_id}' returning *`;
  console.log(date, id)
  db.query(timeQuery)
    .then((data) => {
      console.log(data)
      res.locals.dbTime = data.rows[0].interview_date;
      console.log('res.locals.dbTime----->', res.locals.dbTime)
      return next();
    })  
};
userController.deleteJob = (req, res, next) => {
  console.log('inside deleteJob')
  const {id} = req.body;
  const deleteQuery = `delete from users_jobs where user_id = '${res.locals.user_id}' and job_id = '${id}' returning *`;
    db.query(deleteQuery)
      .then((data) => {console.log(`deleted job ${id} successfully`)
      return next();
    })
};
userController.getJobInfo = (req, res, next) => {
  console.log('inside of getJobInfo');
  const { id } = req.body;
  const getJobInfoQuery = `select * from users_jobs where user_id = '${res.locals.user_id}' and job_id = '${id}' returning * `;
   db.query(getJobInfoQuery)
   .then((data) => { res.locals.getJobInfo = data })
   return next();
}
userController.addNote = (req, res, next) => {
  console.log('inside addNotes')
  const { notes, id } = req.body;
  const notesQuery = `update users_jobs set notes = ‘${notes}’ where job_id = ‘${id}’ and user_id = '${res.locals.user_id}' returning *`;
  console.log(notes, id)
  db.query(notesQuery)
    .then((data) => {
      console.log(data)
      res.locals.notes = data.rows[0].notes;
      return next();
    })
};

module.exports = userController;
