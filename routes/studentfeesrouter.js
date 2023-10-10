const express = require('express');
const router = express.Router();

const {studentFeesDetails,getstudentfees,getstudentfeesbyName,updatestudentfeestByName  } = require("../controllers/studentfees");

// Handle POST request to submit name and email
router.route("/studentfeesSubmit").post(studentFeesDetails);
router.route("/getstudentfees").get(getstudentfees);  
router.route("/getstudentfeesbytstdid").get(getstudentfeesbyName);  
router.route("/updatestudentfeesBystdid").put(updatestudentfeestByName);
module.exports = router;