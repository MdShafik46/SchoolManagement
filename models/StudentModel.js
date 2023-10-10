const mongoose = require('mongoose');
const customerSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      maxlength: 100,
    },
    middlename: {
      type: String,
      required: true,
      maxlength: 100,
    },
    lastname: {
      type: String,
      required: true,
      maxlength: 100,
    },
    DOB: {
      type: Date,
    },
    city: {
      type: String,
      required: true,
      maxlength: 20,
    },
    remark: {
      type: String,
      required: true,
      maxlength: 100,
    },
    address1: {
      type: String,
      required: true,
      maxlength: 200,
      match: /^[a-zA-Z0-9\s]+$/, 
    },
    address2: {
      type: String,
      maxlength: 200,
      match: /^[a-zA-Z0-9\s]+$/, 
    },
    GRNO: {
      type: String,
      maxlength: 5,
     
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
      match: /^\d{10}$/, // 10 digit numeric
    },
    AdmissionDate: {
      type: Date,
    },
    schoolleavingDate: {
      type: Date,
    },
  
  });

const Students = mongoose.model('Students', customerSchema);

module.exports = Students ;