const attendancedetails = require('../models/attendancedetailsmodel');
// remove this endpoint
const attendancedetailssubmit = async (req, res) => {
    try {
        const {
            StudentID,  
            Name,
            InTime,
            OutTime

        } = req.body;

        // Logging the request body
        console.log('Request body:', req.body);

        // Check if a fees with the same name already exists
        const existingid = await attendancedetails.findOne({  StudentID,  
 });
        if (existingid) {
            // Return a 400 Bad Request response if the fees already exists
            return res.status(400).json({ error: 'fees with the same name already exists' });
        }

        // Create a new fees instance
        const newstudent = new attendancedetails({
            StudentID,  
            Name,
            InTime,
            OutTime
        });

        // Save the new fees to the database
        await newstudent.save();

        // Logging the saved fees
        console.log('New fees saved:', newstudent);

        // Return a 201 Created response with the new fees data
        res.status(201).json(newstudent);
    } catch (error) {
        // Handle different types of errors
        console.error('Error in FeesDetails:', error);

        if (error.StudentID === 'ValidationError') {
            // Handle validation errors
            res.status(400).json({ error: error.message });
        } else {
            // Handle other types of errors
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

const getattendancedetails = async (req, res) => {
    try {
        const student = await attendancedetails.find(); 

        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ error: 'Error while retrieving student data' });
    }
};
const getattendancedetailsbyName = async (req, res) => {
    try {
        const { StudentID } = req.query; 

        if (!StudentID) {
            return res.status(400).json({ error: 'Name parameter is required' });
        }

        const student = await attendancedetails.find({ StudentID }); 

        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ error: 'Error while retrieving student data' });
    }
};
const updateattendancedetailstByName = async (req, res) => {
    try {
        const { StudentID } = req.query; // Extract the student's name from query parameters
        console.log('Name from query:', StudentID); // Add this line for debugging

        const updateData = req.body; // Extract the updated data from the request body

        // Use Mongoose or your database library to update the student by name
        const updatedStudent = await attendancedetails.findOneAndUpdate({ StudentID }, updateData, {
            new: true,
        });

        if (!updatedStudent) {
            return res.status(404).json({ error: 'Student not found' });
        }

        res.status(200).json(updatedStudent);
    } catch (error) {
        console.error('Error:', error); // Add this line for debugging
        res.status(500).json({ error: 'Error while updating student data' });
    }
};



 

module.exports = { attendancedetailssubmit,getattendancedetails,getattendancedetailsbyName,updateattendancedetailstByName };
