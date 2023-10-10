const mongoose = require('mongoose');
const feesSchema = new mongoose.Schema({
    Standard: {
      type: Number,
      required: true,
      maxlength:10,
    },
    Tuitionfees: {
    type: Number,
    required: true,
    maxlength: 10,
   },
   TermFees: {
    type: Number,
    required: true,
    maxlength: 10,
   },
   ComputerFees: {
    type: Number,
    required: true,
    maxlength: 10,
   },
   Activityfees: {
    type: Number,
    required: true,
    maxlength: 10,
   },
   
   LabLaboratoryFees: {
    type: Number,
    required: true,
    maxlength: 10,
   },
   SmartclassFees: {
    type: Number,
    required: true,
    maxlength: 10,
   },
   MaintenanceCharges: {
    type: Number,
    required: true,
    maxlength: 10,
   },
   
    
  
  });

const Fees = mongoose.model('Fees', feesSchema);

module.exports = Fees ;