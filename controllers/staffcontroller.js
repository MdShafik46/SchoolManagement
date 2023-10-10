const Staff = require('../models/staffmodel');

const staffDetails = async (req, res) => {
    try {
        const {
RFId, 
Staffid, 
name,
MiddleName,
LastName,
Gender,
DOB,
Address1,
Address2,
City,
Role,
Mobilenumber,
EmergencyNumber,
ReportingTo,
PANnumber,
Aadharnumber,
AccountDetails,
PFnumber

        } = req.body;

        
        console.log('Request body:', req.body);

        // Check if a company with the same name already exists
        const existingCompany = await Staff.findOne({ name });
        if (existingCompany) {
            // Return a 400 Bad Request response if the company already exists
            return res.status(400).json({ error: 'Company with the same name already exists' });
        }


        
        const newStaff = new Staff({
            RFId, 
            Staffid, 
            name,
            MiddleName,
            LastName,
            Gender,
            DOB,
            Address1,
            Address2,
            City,
            Role,
            Mobilenumber,
            EmergencyNumber,
            ReportingTo,
            PANnumber,
            Aadharnumber,
            AccountDetails,
            PFnumber

        });

        
        await newStaff.save();

        console.log('New company saved:', newStaff);

        // Return a 201 Created response with the new company data
        res.status(201).json(newStaff);
    } catch (error) {
        // Handle different types of errors
        console.error('Error in CompanyDetails:', error);

        if (error.name === 'ValidationError') {
            // Handle validation errors
            res.status(400).json({ error: error.message });
        } else {
            // Handle other types of errors
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

const getStaff = async (req, res) => {
    try {
        // Use a different variable name to avoid naming conflict
        const staffData = await Staff.find(); 

        res.status(200).json(staffData);
    } catch (error) {
        res.status(500).json({ error: 'Error while retrieving staff data' });
    }
};

const getStaffbyName = async (req, res) => {
    try {
        const { name } = req.query; 

        if (!name) {
            return res.status(400).json({ error: 'Name parameter is required' });
        }

        const Staffdata = await Staff.find({ name }); 

        res.status(200).json(Staffdata);
    } catch (error) {
        res.status(500).json({ error: 'Error while retrieving student data' });
    }
};
const updateStafftByName = async (req, res) => {
    try {
        const { name } = req.query; // Extract the student's name from query parameters
        console.log('Name from query:', name); // Add this line for debugging

        const updateData = req.body; // Extract the updated data from the request body

        // Use Mongoose or your database library to update the student by name
        const updatedStudent = await Staff.findOneAndUpdate({ name }, updateData, {
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



 

module.exports = { staffDetails,getStaff,getStaffbyName,updateStafftByName };
