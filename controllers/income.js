const IncomeSchema=require("../models/IncomeModel")
const mongoose = require('mongoose');

exports.addIncome = async (req, res) => {
    try {
      const { title, amount, category, description, date } = req.body;
  
      if (!title || !description || !category || !date) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      if (typeof amount !== 'number' || amount <= 0) {
        return res.status(400).json({ message: 'Amount must be a positive number' });
      }
  
      const income = new IncomeSchema({
        title,
        amount,
        category,
        description,
        date,
      });
  
      await income.save();
      return res.status(200).json({ message: 'Income added successfully' });
    } catch (err) {
      console.error('❌ Error:', err.message);
      return res.status(500).json({ message: 'Server error' });
    }
  };

  exports.getIncomes = async (req, res) => {
    try{
        const incomes=await IncomeSchema.find().sort({createdAt: -1})
        res.status(200).json(incomes);

    }
    catch(error){
        res.status(500).json({message:"Server Error"})
    }

  }
  exports.deleteIncome = async (req, res) => {
    const { id } = req.params;
  
    try {
      const deleted = await IncomeSchema.findByIdAndDelete(id);
      if (!deleted) {
        return res.status(404).json({ message: 'Income not found' });
      }
      res.status(200).json({ message: 'Income deleted' });
    } catch (err) {
      console.error('❌ Delete Error:', err);
      res.status(500).json({ message: 'Server error' });
    }
  };
  

  