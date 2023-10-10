
const mongoose = require('mongoose');
const userlogSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true,
      maxlength: 100
    },
    password: {
      type: String,
      required: true,
      unique: true
    }
  });
  
  const Login = mongoose.model('Login', userlogSchema);
  module.exports = Login;