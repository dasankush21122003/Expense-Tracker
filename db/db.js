const mongoose = require('mongoose');

const db = async () => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.MONGO_URL);
    console.log('✅ DB Connected');
  } catch (error) {
    console.error('❌ DB connection error:', error.message);
  }
};

module.exports = { db };
