const mongoose = require('mongoose');
const studentfeesSchema = new mongoose.Schema({
    transactionId: {
      type: Number,
      required: true,
      maxlength:10,
    },
    StudentId: {
    type: Number,
    required: true,
    maxlength: 10,
   },
   Std: {
    type: Number,
    required: true,
    maxlength: 10,
   },
   TotalFees: {
    type: Number,
    required: true,
    maxlength: 10,
   },
  
    
  
  });

const studentFees = mongoose.model('studentFees', studentfeesSchema);

module.exports = studentFees ;