const ExpenseSchema = require("../models/expenseModel"); // ✅ Corrected name
const mongoose = require('mongoose');

exports.addExpense = async (req, res) => {
  try {
    const { title, amount, category, description, date } = req.body;

    if (!title || !description || !category || !date) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (typeof amount !== 'number' || amount <= 0) {
      return res.status(400).json({ message: 'Amount must be a positive number' });
    }

    const expense = new ExpenseSchema({
      title,
      amount,
      category,
      description,
      date,
    });

    await expense.save();
    return res.status(200).json({ message: 'Expense added successfully' }); // ✅ updated message
  } catch (err) {
    console.error('❌ Error:', err.message);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.getExpenses = async (req, res) => {
  try {
    const expenses = await ExpenseSchema.find().sort({ createdAt: -1 });
    res.status(200).json(expenses); // ✅ fixed variable name
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteExpense = async (req, res) => {
  const { id } = req.params;

  // ✅ Validate ID before using it
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  try {
    const deleted = await ExpenseSchema.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    res.status(200).json({ message: 'Expense deleted' });
  } catch (err) {
    console.error('❌ Delete Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
