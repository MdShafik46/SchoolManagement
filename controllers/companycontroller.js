const Company = require('../models/company');

const CompanyDetails = async (req, res) => {
    try {
        const {
            id,
            name,
            Address1,
            Address2,
            City,
            State,
            Location,
            Contactnumber,
            Email,
            Registration,
            Grant
        } = req.body;

        // Logging the request body
        console.log('Request body:', req.body);

        // Check if a company with the same name already exists
        const existingCompany = await Company.findOne({ name });
        if (existingCompany) {
            // Return a 400 Bad Request response if the company already exists
            return res.status(400).json({ error: 'Company with the same name already exists' });
        }

        // Create a new Company instance
        const newCompany = new Company({
            id,
            name,
            Address1,
            Address2,
            City,
            State,
            Location,
            Contactnumber,
            Email,
            Registration,
            Grant
        });

        // Save the new company to the database
        await newCompany.save();

        // Logging the saved company
        console.log('New company saved:', newCompany);

        // Return a 201 Created response with the new company data
        res.status(201).json(newCompany);
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

const getCompany = async (req, res) => {
    try {
        const company = await Company.find(); 

        res.status(200).json(company);
    } catch (error) {
        res.status(500).json({ error: 'Error while retrieving student data' });
    }
};
const getCompanybyName = async (req, res) => {
    try {
        const { name } = req.query; 

        if (!name) {
            return res.status(400).json({ error: 'Name parameter is required' });
        }

        const company = await Company.find({ name }); 

        res.status(200).json(company);
    } catch (error) {
        res.status(500).json({ error: 'Error while retrieving student data' });
    }
};
const updateCompanytByName = async (req, res) => {
    try {
        const { name } = req.query; // Extract the student's name from query parameters
        console.log('Name from query:', name); // Add this line for debugging

        const updateData = req.body; // Extract the updated data from the request body

        // Use Mongoose or your database library to update the student by name
        const updatedStudent = await Company.findOneAndUpdate({ name }, updateData, {
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



 

module.exports = { CompanyDetails,getCompany,getCompanybyName,updateCompanytByName };
