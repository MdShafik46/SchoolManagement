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

      
        console.log('Request body:', req.body);

       
        const existingCompany = await Company.findOne({ name });
        if (existingCompany) {
           
            return res.status(400).json({ error: 'Company with the same name already exists' });
        }

      
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

       
        await newCompany.save();

       
        console.log('New company saved:', newCompany);

        
        res.status(201).json(newCompany);
    } catch (error) {
       
        console.error('Error in CompanyDetails:', error);

        if (error.name === 'ValidationError') {
            
            res.status(400).json({ error: error.message });
        } else {
         
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
        const { name } = req.query; 
        console.log('Name from query:', name);

        const updateData = req.body; 

       
        const updatedStudent = await Company.findOneAndUpdate({ name }, updateData, {
            new: true,
        });

        if (!updatedStudent) {
            return res.status(404).json({ error: 'Company not found' });
        }

        res.status(200).json(updatedStudent);
    } catch (error) {
        console.error('Error:', error); 
        res.status(500).json({ error: 'Error while updating Company data' });
    }
};



 

module.exports = { CompanyDetails,getCompany,getCompanybyName,updateCompanytByName };
