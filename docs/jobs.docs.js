/**
 * @swagger
 * components:
 *   schemas:
 *     Job:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Job ID
 *         employerId:
 *           type: string
 *           description: Employer user ID
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         category:
 *           type: string
 *         location:
 *           type: string
 *         salary:
 *           type: number
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     CreateJobRequest:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - category
 *         - location
 *         - salary
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         category:
 *           type: string
 *         location:
 *           type: string
 *         salary:
 *           type: number
 *     UpdateJobRequest:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         category:
 *           type: string
 *         location:
 *           type: string
 *         salary:
 *           type: number
 */

/**
 * @swagger
 * tags:
 *   - name: Jobs
 *     description: Job management and retrieval
 */

/**
 * @swagger
 * /jobs:
 *   get:
 *     summary: List all jobs with optional filters
 *     tags: [Jobs]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Search by job title
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [newest, oldest]
 *     responses:
 *       200:
 *         description: List of jobs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Job'
 */

/**
 * @swagger
 * /jobs/{id}:
 *   get:
 *     summary: Get a single job by ID
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Job ID
 *     responses:
 *       200:
 *         description: Job details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Job'
 *       404:
 *         description: Job not found
 */

/**
 * @swagger
 * /jobs:
 *   post:
 *     summary: Create a new job (employer only)
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateJobRequest'
 *     responses:
 *       201:
 *         description: Job created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Job'
 */

/**
 * @swagger
 * /jobs/{id}:
 *   put:
 *     summary: Update a job (owner only)
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Job ID
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateJobRequest'
 *     responses:
 *       200:
 *         description: Job updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Job'
 *       403:
 *         description: Not the owner of the job
 *       404:
 *         description: Job not found
 */

/**
 * @swagger
 * /jobs/{id}:
 *   delete:
 *     summary: Delete a job (owner only)
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Job ID
 *     responses:
 *       200:
 *         description: Job deleted
 *       403:
 *         description: Not the owner of the job
 *       404:
 *         description: Job not found
 */

/**
 * @swagger
 * /jobs/mine/list:
 *   get:
 *     summary: Get all jobs posted by the logged-in employer
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of employer's jobs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Job'
 */
