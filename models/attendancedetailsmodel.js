const mongoose = require('mongoose');
const attendancedetailsSchema = new mongoose.Schema({
    StudentID: {
      type: Number,
      required: true,
      maxlength:10,
    },
    Name: {
    type: String,
    required: true,
    maxlength: 10,
   },
   InTime: {
    type: Number,
    required: true,
    maxlength: 10,
   },
   OutTime: {
    type: Number,
    required: true,
    maxlength: 10,
   },
  
    
  
  });

const attendancedetails = mongoose.model('attendancedetailsSchema', attendancedetailsSchema);

module.exports = attendancedetails ;