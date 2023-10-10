const studentfees = require('../models/studentfeesmodel');

const studentFeesDetails = async (req, res) => {
    try {getstudentfees
        const {
            transactionId,  
            StudentId,
            Std,
            TotalFees,


        } = req.body;

        // Logging the request body
        console.log('Request body:', req.body);

        // Check if a fees with the same name already exists
        const existingfees = await studentfees.findOne({  StudentId,  
 });
        if (existingfees) {
            // Return a 400 Bad Request response if the fees already exists
            return res.status(400).json({ error: 'fees with the same name already exists' });
        }

        // Create a new fees instance
        const newstudentfees = new studentfees({
            transactionId,  
            StudentId,
            Std,
            TotalFees,
        });

        // Save the new fees to the database
        await newstudentfees.save();

        // Logging the saved fees
        console.log('New fees saved:', newstudentfees);

        // Return a 201 Created response with the new fees data
        res.status(201).json(newstudentfees);
    } catch (error) {
        // Handle different types of errors
        console.error('Error in studentFeesDetails:', error);

        if (error.StudentId === 'ValidationError') {
            // Handle validation errors
            res.status(400).json({ error: error.message });
        } else {
            // Handle other types of errors
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

const getstudentfees = async (req, res) => {
    try {
        const fees = await studentfees.find(); 

        res.status(200).json(fees);
    } catch (error) {
        res.status(500).json({ error: 'Error while retrieving student data' });
    }
};
const getstudentfeesbyName = async (req, res) => {
    try {
        const { StudentId } = req.query; 

        if (!StudentId) {
            return res.status(400).json({ error: 'Name parameter is required' });
        }

        const fees = await studentfees.find({ StudentId }); 

        res.status(200).json(fees);
    } catch (error) {
        res.status(500).json({ error: 'Error while retrieving student data' });
    }
};
const updatestudentfeestByName = async (req, res) => {
    try {
        const { StudentId } = req.query; // Extract the student's name from query parameters
        console.log('Name from query:', StudentId); // Add this line for debugging

        const updateData = req.body; // Extract the updated data from the request body

        // Use Mongoose or your database library to update the student by name
        const updatedStudent = await studentfees.findOneAndUpdate({ StudentId }, updateData, {
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



 

module.exports = { studentFeesDetails,getstudentfees,getstudentfeesbyName,updatestudentfeestByName };
