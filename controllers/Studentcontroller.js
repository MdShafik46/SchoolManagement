const Students = require('../models/StudentModel');

const StudentDetails = async (req, res) => {
    try {
        const {
            name,
            lastname,
            middlename,
            GRNO,
            DOB,
            city,
            remark,
            address1,
            address2,
            mobile,
            AdmissionDate,
            schoolleavingDate,
        } = req.body;

        
        const existingstudent = await Students.findOne({ GRNO });
        if (existingstudent) {
            return res.status(400).json({ error: 'GR Number  already exists' });
        }

        
        const newStudent = new Students({
            name,
            lastname,
            middlename,
            GRNO,
            DOB,
            city,
            remark,
            address1,
            address2,
            mobile,
            AdmissionDate,
            schoolleavingDate,
        });

        
        await newStudent.save();

        res.status(201).json(newStudent);
    } catch (error) {
        res.status(500).json({ error: 'Error found in your json data' });
    }
};

//get all students details
const getStudents = async (req, res) => {
    try {
        const student = await Students.find(); 

        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ error: 'Error while retrieving student data' });
    }
};

//get student by name or grno
const getStudentbyName = async (req, res) => {
    try {
        const { name } = req.query; 

        if (!name) {
            return res.status(400).json({ error: 'Name parameter is required' });
        }

        const student = await Students.find({ name }); 

        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ error: 'Error while retrieving student data' });
    }
};

// updateStudentBy fullname or grno
const updateStudentByName = async (req, res) => {
    try {
        const { name } = req.query; 
        console.log('Name from query:', name); 

        const updateData = req.body; 

       
        const updatedStudent = await Students.findOneAndUpdate({ name }, updateData, {
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



 

module.exports = { StudentDetails,getStudents,getStudentbyName,updateStudentByName };
