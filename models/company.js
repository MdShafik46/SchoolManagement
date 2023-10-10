const mongoose = require('mongoose');
const companySchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      maxlength: 100,
    },
   id: {
    type: String,
    required: true,
    maxlength: 10,
   },
   Address1: {
    type: String,
    required: true,
    maxlength: 10,
   },
   Address2: {
    type: String,
    required: true,
    maxlength: 10,
   },
   City: {
    type: String,
    required: true,
    maxlength: 10,
   },
   
   State: {
    type: String,
    required: true,
    maxlength: 10,
   },
   Location: {
    type: String,
    required: true,
    maxlength: 10,
   },
   Contactnumber: {
    type: String,
    required: true,
    maxlength: 10,
   },
   Email: {
    type: String,
    required: true,
    maxlength: 10,
   },
   Registration: {
    type: String,
    required: true,
    maxlength: 10,
   },
   Grant: {
    type: String,
    required: true,
    maxlength: 10,
   },
    
  
  });

const Company = mongoose.model('Company', companySchema);

module.exports = Company ;