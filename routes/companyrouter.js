const express = require('express');
const router = express.Router();

const {CompanyDetails,getCompany,getCompanybyName,updateCompanytByName } = require("../controllers/companycontroller");

// Handle POST request to submit name and email
router.route("/companySubmit").post(CompanyDetails);
router.route("/getcompany").get(getCompany);  
router.route("/getcompanybyName").get(getCompanybyName);  
router.route("/updatecompanyByName").put(updateCompanytByName);
module.exports = router;