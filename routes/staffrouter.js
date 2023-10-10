const express = require('express');
const router = express.Router();

const {staffDetails,getStaff,getStaffbyName,updateStafftByName } = require("../controllers/staffcontroller");

// Handle POST request to submit name and email
router.route("/staffSubmit").post(staffDetails);
router.route("/getstaff").get(getStaff);  
router.route("/getstaffbyName").get(getStaffbyName);  
router.route("/updatestaffByName").put(updateStafftByName);
module.exports = router;