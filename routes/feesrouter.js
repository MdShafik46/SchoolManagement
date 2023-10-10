const express = require('express');
const router = express.Router();

const {FeesDetails,getfees,getfeesbyName,updatefeestByName } = require("../controllers/Feescontroller");

// Handle POST request to submit name and email
router.route("/feesSubmit").post(FeesDetails);
router.route("/getfees").get(getfees);  
router.route("/getfeesbyName").get(getfeesbyName);  
router.route("/updatefeesByName").put(updatefeestByName);
module.exports = router;