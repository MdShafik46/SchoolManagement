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

   
        console.log('Request body:', req.body);

        
        const existingid = await attendancedetails.findOne({  StudentID,  
 });
        if (existingid) {
          
            return res.status(400).json({ error: 'name already exists' });
        }

       
        const newstudent = new attendancedetails({
            StudentID,  
            Name,
            InTime,
            OutTime
        });

       
        await newstudent.save();

        
        console.log('New saved:', newstudent);

        
        res.status(201).json(newstudent);
    } catch (error) {
        
        console.error('Error in Details:', error);

        if (error.StudentID === 'ValidationError') {
            
            res.status(400).json({ error: error.message });
        } else {
           
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
            return res.status(400).json({ error: 'StudentID parameter is required' });
        }

        const student = await attendancedetails.find({ StudentID }); 

        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ error: 'Error while retrieving student data' });
    }
};
const updateattendancedetailstByName = async (req, res) => {
    try {
        const { StudentID } = req.query; 
        console.log('Name from query:', StudentID); 

        const updateData = req.body; 

        
        const updatedStudent = await attendancedetails.findOneAndUpdate({ StudentID }, updateData, {
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



 

module.exports = { attendancedetailssubmit,getattendancedetails,getattendancedetailsbyName,updateattendancedetailstByName };
