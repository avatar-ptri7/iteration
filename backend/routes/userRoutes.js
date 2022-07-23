const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();
const authController = require("../controllers/authController");

// this gets a job that the user has saved
router.get("/job/:id",  authController.verifySession, userController.getJob, (req, res) => {
  return res.status(200).json(res.locals.values);
});

// this will get all of the saved jobs
router.get(
  "/getalljobs", authController.verifySession,
  userController.getAllJobs,
  (req, res) => {
    console.log("attempting to get all jobs...");
    return res.status(200).json(res.locals.values);
  }
);
router.get('/rank',authController.verifySession, userController.getRank, (req, res) => {
  console.log("getting rank!");
  return res.status(200).json(res.locals.data)
})

// this will save a job when a user swipes right
router.post(
  "/savejob", authController.verifySession, 
  userController.saveJob,
  (req, res) => {
    console.log("inside userRoute...");
    return res.status(200).json(res.locals.user);
  }
);
router.post('/updatestatus', authController.verifySession, userController.updateStatus, (req, res) => {
  console.log("updating status!");
    return res.status(200).json(res.locals.job)
})
router.post('/rank',authController.verifySession, userController.updateRank, (req, res) => {
  console.log('last rank works')
  return res.status(201).json(res.locals.dbData);
});
router.post('/apply', authController.verifySession, userController.applyStatus, (req, res) => {
  console.log('inside last middleware for /apply');
  return res.status(200).json(res.locals.newDbStatus)
});
router.post('/addtime', authController.verifySession, userController.addDate, (req, res) => {
  console.log('inside last middleware for addTime')
  return res.status(200).json(res.locals.dbTime);
});
router.post('/deletejob', authController.verifySession, userController.deleteJob, (req, res) => {
  console.log('inside last middleware for deletejob')
  return res.status(200)
});
router.post('/getJobInfo', authController.verifySession, userController.getJobInfo, (req, res) => {
  console.log('inside of getJobInfor middleware ');
  return res.status(200).json(res.locals.getJobInfo);
});
router.post('/addNote', authController.verifySession, userController.addNote, (req, res) => {
  console.log('inside last middleware for addTime')
  return res.status(200).json(res.locals.notes)
});

module.exports = router;
