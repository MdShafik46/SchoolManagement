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

        
        console.log('Request body:', req.body);

       
        const existingfees = await fees.findOne({  Standard,  
 });
        if (existingfees) {
           
            return res.status(400).json({ error: 'fees with the same name already exists' });
        }

       
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

        
        await newfees.save();

        
        console.log('New fees saved:', newfees);

       
        res.status(201).json(newfees);
    } catch (error) {
      
        console.error('Error in FeesDetails:', error);

        if (error.name === 'ValidationError') {
        
            res.status(400).json({ error: error.message });
        } else {
           
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

const getfees = async (req, res) => {
    try {
        const fees = await fees.find(); 

        res.status(200).json(fees);
    } catch (error) {
        res.status(500).json({ error: 'Error while retrieving fees data' });
    }
};
const getfeesbyName = async (req, res) => {
    try {
        const { Standard } = req.query; 

        if (!name) {
            return res.status(400).json({ error: 'fees parameter is required' });
        }

        const fees = await fees.find({ Standard }); 

        res.status(200).json(fees);
    } catch (error) {
        res.status(500).json({ error: 'Error while retrieving student data' });
    }
};
const updatefeestByName = async (req, res) => {
    try {
        const { Standard } = req.query;
        console.log('Name from query:', Standard); 

        const updateData = req.body; 

       
        const updatedfees = await fees.findOneAndUpdate({ Standard }, updateData, {
            new: true,
        });

        if (!updatedfees) {
            return res.status(404).json({ error: 'fees not found' });
        }

        res.status(200).json(updatedfees);
    } catch (error) {
        console.error('Error:', error); 
        res.status(500).json({ error: 'Error while updating fees data' });
    }
};



 

module.exports = { FeesDetails,getfees,getfeesbyName,updatefeestByName };
