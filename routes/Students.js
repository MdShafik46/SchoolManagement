const express = require('express');
const router = express.Router();

const {StudentDetails,getStudents,getStudentbyName,updateStudentByName} = require("../controllers/Studentcontroller");

// Handle POST request to submit name and email
router.route("/StudentSubmit").post(StudentDetails);
router.route("/getStudents").get(getStudents);  
router.route("/getStudentbyName").get(getStudentbyName);  
router.route("/updateStudentByName").put(updateStudentByName);
module.exports = router;