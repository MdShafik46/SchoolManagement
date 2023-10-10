const mongoose = require('mongoose');
const staffSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      maxlength: 100,
    },
    Staffid: {
        type: String,
        required: true,
        maxlength: 10,
      },
      MiddleName: {
      type: String,
      required: true,
      maxlength: 100,
    },
    LastName: {
      type: String,
      required: true,
      maxlength: 100,
    },
    DOB: {
      type: Date,
    },
    City: {
      type: String,
      required: true,
      maxlength: 20,
    },
    
    Address1: {
      type: String,
      required: true,
      maxlength: 200,
      match: /^[a-zA-Z0-9\s]+$/, 
    },
    Address2: {
      type: String,
      maxlength: 200,
      match: /^[a-zA-Z0-9\s]+$/, 
    },
   
    Mobilenumber: {
      type: String,
      required: true,
      unique: true,
      match: /^\d{10}$/, // 10 digit numeric
    },
    
    Gender: {
        type: String,
        required: true,
      },
      Role: {
        type: String,
        required: true,
      },
      EmergencyNumber: {
        type: String,
        required: true,
        unique: true,
        match: /^\d{10}$/, // 10 digit numeric
      },
      ReportingTo: {
        type: String,
        required: true,
      },
      PANnumber: {
        type: String,
        required: true,
      },
      Aadharnumber: {
        type: String,
        required: true,
      },
      AccountDetails: {
        type: String,
        required: true,
      },
      PFnumber: {
        type: String,
        required: true,
      },
  
  });
  

const Staff = mongoose.model('Staff', staffSchema);

module.exports = Staff ;