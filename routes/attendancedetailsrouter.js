const express = require('express');
const router = express.Router();

const {attendancedetailssubmit,getattendancedetails,getattendancedetailsbyName,updateattendancedetailstByName } = require("../controllers/attendancedetailsController");

// Handle POST request to submit name and email
router.route("/attendancedetailssubmit").post(attendancedetailssubmit);
router.route("/getattendancedetails").get(getattendancedetails);  
router.route("/getattendancedetailsbyName").get(getattendancedetailsbyName);  
router.route("/updateattendancedetailstByName").put(updateattendancedetailstByName);
module.exports = router;