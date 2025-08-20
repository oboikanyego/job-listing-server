/**
 * @swagger
 * components:
 *   schemas:
 *     Application:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Application ID
 *         jobId:
 *           type: string
 *           description: ID of the job applied for
 *         candidateId:
 *           type: string
 *           description: Candidate's user ID
 *         coverLetter:
 *           type: string
 *         status:
 *           type: string
 *           enum: [accepted, rejected, reviewing]
 *           description: Current application status
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     CreateApplicationRequest:
 *       type: object
 *       required:
 *         - jobId
 *         - coverLetter
 *       properties:
 *         jobId:
 *           type: string
 *           description: Job ID to apply for
 *         coverLetter:
 *           type: string
 *           description: Candidate's cover letter
 *     UpdateApplicationStatusRequest:
 *       type: object
 *       required:
 *         - status
 *       properties:
 *         status:
 *           type: string
 *           enum: [accepted, rejected, reviewing]
 *           description: New status for the application
 */

/**
 * @swagger
 * tags:
 *   name: Applications
 *   description: Endpoints for job applications
 */

/**
 * @swagger
 * /applications:
 *   post:
 *     summary: Apply to a job (candidate only)
 *     tags: [Applications]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateApplicationRequest'
 *     responses:
 *       201:
 *         description: Application created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Application'
 *       400:
 *         description: Already applied to this job
 *       404:
 *         description: Job not found
 *       500:
 *         description: Failed to apply
 */

/**
 * @swagger
 * /applications/mine:
 *   get:
 *     summary: Get current candidate's applications
 *     tags: [Applications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of applications
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Application'
 *       500:
 *         description: Failed to fetch applications
 */

/**
 * @swagger
 * /applications/job/{jobId}:
 *   get:
 *     summary: Get all applications for a job (employer only)
 *     tags: [Applications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: jobId
 *         required: true
 *         schema:
 *           type: string
 *         description: Job ID
 *     responses:
 *       200:
 *         description: List of applications
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Application'
 *       500:
 *         description: Failed to fetch applications
 */

/**
 * @swagger
 * /applications/{id}/status:
 *   put:
 *     summary: Update application status (employer only)
 *     tags: [Applications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Application ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateApplicationStatusRequest'
 *     responses:
 *       200:
 *         description: Updated application
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Application'
 *       403:
 *         description: Not your job posting
 *       404:
 *         description: Application not found
 *       500:
 *         description: Failed to update status
 */
