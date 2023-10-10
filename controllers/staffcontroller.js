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

       
        const existingCompany = await Staff.findOne({ name });
        if (existingCompany) {
           
            return res.status(400).json({ error: 'staff with the same name already exists' });
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

        console.log('New staff saved:', newStaff);

       
        res.status(201).json(newStaff);
    } catch (error) {
      
        console.error('Error in staffDetails:', error);

        if (error.name === 'ValidationError') {
           
            res.status(400).json({ error: error.message });
        } else {
          
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

const getStaff = async (req, res) => {
    try {
       
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
        const { name } = req.query;
        console.log('Name from query:', name);

        const updateData = req.body;

        
        const updatedstaff = await Staff.findOneAndUpdate({ name }, updateData, {
            new: true,
        });

        if (!updatedstaff) {
            return res.status(404).json({ error: 'Student not found' });
        }

        res.status(200).json(updatedstaff);
    } catch (error) {
        console.error('Error:', error); 
        res.status(500).json({ error: 'Error while updating student data' });
    }
};



 

module.exports = { staffDetails,getStaff,getStaffbyName,updateStafftByName };
