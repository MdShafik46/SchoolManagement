const studentfees = require('../models/studentfeesmodel');

const studentFeesDetails = async (req, res) => {
    try {getstudentfees
        const {
            transactionId,  
            StudentId,
            Std,
            TotalFees,


        } = req.body;

        console.log('Request body:', req.body);

        
        const existingfees = await studentfees.findOne({  StudentId,  
 });
        if (existingfees) {
           
            return res.status(400).json({ error: 'fees with the same name already exists' });
        }

        
        const newstudentfees = new studentfees({
            transactionId,  
            StudentId,
            Std,
            TotalFees,
        });

        
        await newstudentfees.save();

       
        console.log('New fees saved:', newstudentfees);

        
        res.status(201).json(newstudentfees);
    } catch (error) {
       
        console.error('Error in studentFeesDetails:', error);

        if (error.StudentId === 'ValidationError') {
           
            res.status(400).json({ error: error.message });
        } else {
           
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
        const { StudentId } = req.query;
        console.log('Name from query:', StudentId); 

        const updateData = req.body; 

        
        const updatedStudent = await studentfees.findOneAndUpdate({ StudentId }, updateData, {
            new: true,
        });

        if (!updatedStudent) {
            return res.status(404).json({ error: 'Student not found' });
        }

        res.status(200).json(updatedStudent);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error while updating student data' });
    }
};



 

module.exports = { studentFeesDetails,getstudentfees,getstudentfeesbyName,updatestudentfeestByName };
