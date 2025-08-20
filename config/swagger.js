const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Job Listing API',
      version: '1.0.0',
      description: 'API documentation for Job Listing Server',
    },
  },components: {
  securitySchemes: {
    bearerAuth: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT'
    }
  }
},
  apis: [
    path.join(__dirname, '../docs/*.js'),    // all docs files
    path.join(__dirname, '../routes/*.js'),  // all route files if you have inline comments
  ],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = { swaggerUi, swaggerSpec };
