const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const db1 = require('./config/dbconnection');
const app = express();
const path = require('path');
const port = process.env.port;
app.use(bodyParser.json());  
app.use(express.json());
const bcrypt = require('bcrypt');
const cors = require('cors');
const Students = require('./models/StudentModel');
const Company = require('./models/company');

// Allow requests from the specified origin (replace with your frontend URL)
const allowedOrigins = ['http://localhost:3000'];
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

// Use the cors middleware with the options
app.use(cors(corsOptions));
  
db1(); 
app.use(express.static('public')); 
// My routes
const Student = require('./routes/Students');
const company = require('./routes/companyrouter');
const staff = require('./routes/staffrouter');
const fees = require('./routes/feesrouter');
const studentfees = require('./routes/studentfeesrouter');
const attendancestudent = require('./routes/attendancedetailsrouter');

// Use the imported routes
app.use('/',Student);
app.use('/',company);
app.use('/',fees);
app.use('/',studentfees);
app.use('/',attendancestudent);

app.get('/api/merged-data', async (req, res) => {
  try {
      // Fetch data from the first API
      const response1 = await fetch('https://reqres.in/api/users/2');
      if (!response1.ok) {
          throw new Error(`HTTP error! Status: ${response1.status}`);
      }
      const data1 = await response1.json();
      const email = data1.data.email;
      const id = data1.data.id;
      // Fetch data from your database or another API (e.g., Students.find())
      const studentData = await Students.find(); // Assuming this is how you fetch student data

      // Combine the data from both APIs into a single response object
      const mergedData = {
        email,
        id,
          shafikData: studentData,
      };

      res.json(mergedData);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching and merging data.' });
  }
});


app.get('/api/filtered-email', async (req, res) => {
  try {
      // Fetch data from the external API
      const response1 = await fetch('https://reqres.in/api/users/2');
      
      if (!response1.ok) {
          throw new Error(`HTTP error! Status: ${response1.status}`);
      }
      
      const data1 = await response1.json();

      // Extract the 'email' field from the API response
      const email = data1.data.email;

      res.json({ email });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching data from the API.' });
  }
});

// Start the server    
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
