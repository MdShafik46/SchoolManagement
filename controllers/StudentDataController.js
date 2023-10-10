
const User = require('../models/VendorModel');
const Login = require('../models/userloginmodel');
const bcrypt = require('bcrypt');


const VendorAuthentication = async (req, res) => {
  const { name, password } = req.body;

  try {
    const user = await Login.findOne({ name,password });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.password === password && user.name === name) {
      return res.status(200).json({ message: 'Login successful' });
    } else {
      return res.status(401).json({ error: 'Invalid password' });
    }
  } catch (error) {
    console.error('Error verifying credentials:', error);
    res.status(500).json({ error: 'An error occurred while verifying credentials' });
  }
};

  
  const VendorDetails = async (req, res) => {
    const { name, Mobilenumber, GST, country } = req.body;
  
    try {
     
      const existingVendor = await User.findOne({  Mobilenumber });
  
      if (existingVendor) {
        return res.status(400).json({ error: 'Duplicate vendor. This vendor already exists.' });
      }

     
      if (!/^\d{10}$/.test(Mobilenumber)) {
        return res.status(400).json({ error: 'Invalid mobile number.' });
      }
      if (!/^\+91$/.test(country)) {
        return res.status(400).json({ error: 'Invalid country code for mobile number. Use +91 followed by 10 digits.' });
      }
       
      
  

      const newVendor = new User({ name, Mobilenumber, GST,country });
      await newVendor.save();
  
      res.json({ message: 'Data received and saved successfully', vendor: newVendor, redirect: '/login' });
    } catch (error) {
      console.error('Error saving vendor:', error);
      res.status(500).json({ error: 'An error occurred while saving the vendor' });
    }
  };
  
  const getVendor = async (req, res) => {
    const { name } = req.query;
  
    try {
      const vendor = await User.findOne({ name });
      if (!vendor) {
        return res.status(404).json({ error: 'Vendor not found' });
      }
  
      res.json(vendor);
    } catch (error) {
      console.error('Error getting vendor:', error);
      res.status(500).json({ error: 'An error occurred while getting the vendor' });
    }
  };

  const getbyVendorid = async (req, res) => {
    const { _id } = req.query;
  
    try {
      const vendor = await User.findOne({ _id });
      if (!vendor) {
        return res.status(404).json({ error: 'Vendor not found' });
      }
  
      res.json(vendor);
    } catch (error) {
      console.error('Error getting vendor:', error);
      res.status(500).json({ error: 'An error occurred while getting the vendor' });
    }
  };

  const updateVendor = async (req, res) => {
    const { name } = req.query;
    const updates = req.body;
  
    try {
      console.log('Updating vendor:', name);
  
      const updatedVendor = await User.findOneAndUpdate({ name }, updates, { new: true });
  
      console.log('Updated vendor:', updatedVendor);
  
      if (!updatedVendor) {
        return res.status(404).json({ error: 'Vendor not found' });
      }
  
      res.json({ message: 'Vendor updated successfully', vendor: updatedVendor });
    } catch (error) {
      console.error('Error updating vendor:', error);
      res.status(500).json({ error: 'An error occurred while updating the vendor' });
    }
  };
  
  
  

  const deleteVendor = async (req, res) => {
    const { name } = req.query;
  
    try {
     
      const deletedVendor = await User.findOneAndDelete({ name });
  
      if (!deletedVendor) {
        return res.status(404).json({ error: 'Vendor not found' });
      }
  
      res.json({ message: 'Vendor deleted successfully', vendor: deletedVendor });
    } catch (error) {
      console.error('Error deleting vendor:', error);
      res.status(500).json({ error: 'An error occurred while deleting the vendor' });
    }
  };
  

  

  module.exports = {VendorDetails, getVendor, updateVendor,deleteVendor,getbyVendorid,VendorAuthentication}