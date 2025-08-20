const express = require('express');
const Job = require('../models/job.model');
const { authMiddleware, restrictTo } = require('../middlewares/auth.middleware');
const router = express.Router();

// List jobs with optional filters
router.get('/', async (req, res) => {
  try {
    const { q, category, location, sort } = req.query;
    const filter = {};
    if (q) filter.title = { $regex: q, $options: 'i' };
    if (category) filter.category = category;
    if (location) filter.location = location;

    let query = Job.find(filter).populate('employerId', 'name');
    if (sort === 'newest') query = query.sort({ createdAt: -1 });
    if (sort === 'oldest') query = query.sort({ createdAt: 1 });

    const jobs = await query.exec();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to list jobs' });
  }
});

// Get single job
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('employerId', 'name');
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json(job);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get job' });
  }
});

// Create job (employer only)
router.post('/', authMiddleware, restrictTo('employer'), async (req, res) => {
  try {
    const { title, description, category, location, salary } = req.body;
    const job = await Job.create({
      employerId: req.user.userId,
      title, description, category, location, salary
    });
    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create job' });
  }
});

// Update job (owner only)
router.put('/:id', authMiddleware, restrictTo('employer'), async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    if (job.employerId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not your job posting' });
    }
    const { title, description, category, location, salary } = req.body;
    job.title = title ?? job.title;
    job.description = description ?? job.description;
    job.category = category ?? job.category;
    job.location = location ?? job.location;
    job.salary = salary ?? job.salary;
    await job.save();
    res.json(job);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update job' });
  }
});

// Delete job (owner only)
router.delete('/:id', authMiddleware, restrictTo('employer'), async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    if (job.employerId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not your job posting' });
    }
    await job.deleteOne();
    res.json({ message: 'Job deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete job' });
  }
});

// Employer's own jobs
router.get('/mine/list', authMiddleware, restrictTo('employer'), async (req, res) => {
  try {
    const jobs = await Job.find({ employerId: req.user.userId }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to list my jobs' });
  }
});

module.exports = router;
