const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  candidateId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  coverLetter: { type: String, default: '' },
  status: { type: String, enum: ['submitted', 'reviewing', 'accepted', 'rejected'], default: 'submitted' }
}, { timestamps: true,
  collection: 'applications' });

module.exports = mongoose.model('Application', applicationSchema);
