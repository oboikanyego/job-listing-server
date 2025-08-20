const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  employerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  location: { type: String, default: 'Remote' },
  salary: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);
