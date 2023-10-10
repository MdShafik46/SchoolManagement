const fees = require('../models/feesmodel');

const FeesDetails = async (req, res) => {
    try {
        const {
Standard,  
Tuitionfees,
TermFees,
ComputerFees,
Activityfees,
LabLaboratoryFees,
SmartclassFees,
MaintenanceCharges

        } = req.body;

        // Logging the request body
        console.log('Request body:', req.body);

        // Check if a fees with the same name already exists
        const existingfees = await fees.findOne({  Standard,  
 });
        if (existingfees) {
            // Return a 400 Bad Request response if the fees already exists
            return res.status(400).json({ error: 'fees with the same name already exists' });
        }

        // Create a new fees instance
        const newfees = new fees({
            Standard,  
            Tuitionfees,
            TermFees,
            ComputerFees,
            Activityfees,
            LabLaboratoryFees,
            SmartclassFees,
            MaintenanceCharges
        });

        // Save the new fees to the database
        await newfees.save();

        // Logging the saved fees
        console.log('New fees saved:', newfees);

        // Return a 201 Created response with the new fees data
        res.status(201).json(newfees);
    } catch (error) {
        // Handle different types of errors
        console.error('Error in FeesDetails:', error);

        if (error.name === 'ValidationError') {
            // Handle validation errors
            res.status(400).json({ error: error.message });
        } else {
            // Handle other types of errors
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

const getfees = async (req, res) => {
    try {
        const fees = await fees.find(); 

        res.status(200).json(fees);
    } catch (error) {
        res.status(500).json({ error: 'Error while retrieving student data' });
    }
};
const getfeesbyName = async (req, res) => {
    try {
        const { name } = req.query; 

        if (!name) {
            return res.status(400).json({ error: 'Name parameter is required' });
        }

        const fees = await fees.find({ name }); 

        res.status(200).json(fees);
    } catch (error) {
        res.status(500).json({ error: 'Error while retrieving student data' });
    }
};
const updatefeestByName = async (req, res) => {
    try {
        const { name } = req.query; // Extract the student's name from query parameters
        console.log('Name from query:', name); // Add this line for debugging

        const updateData = req.body; // Extract the updated data from the request body

        // Use Mongoose or your database library to update the student by name
        const updatedStudent = await fees.findOneAndUpdate({ name }, updateData, {
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



 

module.exports = { FeesDetails,getfees,getfeesbyName,updatefeestByName };
