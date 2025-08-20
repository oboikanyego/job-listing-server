const express = require('express');
const Application = require('../models/application.model');
const Job = require('../models/job.model');
const { authMiddleware, restrictTo } = require('../middlewares/auth.middleware');
const router = express.Router();

// Apply to a job (candidate)
router.post('/', authMiddleware, restrictTo('candidate'), async (req, res) => {
  try {
    const { jobId, coverLetter } = req.body;
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    const existing = await Application.findOne({ jobId, candidateId: req.user.userId });
    if (existing) return res.status(400).json({ message: 'You already applied to this job' });

    const appDoc = await Application.create({
      jobId, candidateId: req.user.userId, coverLetter
    });
    res.status(201).json(appDoc);
  } catch (err) {
    res.status(500).json({ message: 'Failed to apply' });
  }
});

// Candidate: my applications
router.get('/mine', authMiddleware, restrictTo('candidate'), async (req, res) => {
  try {
    const apps = await Application.find({ candidateId: req.user.userId })
      .populate('jobId')
      .sort({ createdAt: -1 });
  res.json(apps);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch my applications' });
  }
});

// Employer: applications to my job
router.get('/job/:jobId', authMiddleware, restrictTo('employer'), async (req, res) => {
  try {
    const apps = await Application.find({ jobId: req.params.jobId })
      .populate('candidateId', 'name email')
      .sort({ createdAt: -1 });
    res.json(apps);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch applications' });
  }
});

// Update application status (employer for own job)
router.put('/:id/status', authMiddleware, restrictTo('employer'), async (req, res) => {
  try {
    const { status } = req.body; // accepted | rejected | reviewing
    const appDoc = await Application.findById(req.params.id).populate('jobId');
    if (!appDoc) return res.status(404).json({ message: 'Application not found' });

    if (appDoc.jobId.employerId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not your job posting' });
    }
    appDoc.status = status;
    await appDoc.save();
    res.json(appDoc);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update status' });
  }
});

module.exports = router;
