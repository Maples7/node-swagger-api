var express = require('express');
var router = express.Router();

// var db = require('../controllers/queries');

/**
 * @swagger
 * definitions:
 *   Puppy:
 *     properties:
 *       name:
 *         type: string
 *       breed:
 *         type: string
 *       age:
 *         type: integer
 *       sex:
 *         type: string
 */

/**
 * @swagger
 * /api/puppies:
 *   x-swagger-router-controller: queries
 *   get:
 *     operationId: getAllPuppies
 *     tags:
 *       - Puppies
 *     description: Returns all puppies
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of puppies
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Puppy'
 */
// router.get('/api/puppies', db.getAllPuppies);

/**
 * @swagger
 * /api/puppies:
 *   post:
 *     operationId: createPuppy
 *     tags:
 *       - Puppies
 *     description: Creates a new puppy
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: puppy
 *         description: Puppy object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Puppy'
 *     responses:
 *       200:
 *         description: Successfully created
 */
// router.post('/api/puppies', db.createPuppy);

/**
 * @swagger
 * /api/puppies/{id}:
 *   x-swagger-router-controller: queries
 *   get:
 *     operationId: getSinglePuppy
 *     tags:
 *       - Puppies
 *     description: Returns a single puppy
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Puppy's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: A single puppy
 *         schema:
 *           $ref: '#/definitions/Puppy'
 */
// router.get('/api/puppies/:id', db.getSinglePuppy);

/**
 * @swagger
 * /api/puppies/{id}:
 *   put:
 *     operationId: updatePuppy
 *     tags:
 *       - Puppies
 *     description: Updates a single puppy
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Puppy's id
 *         in: path
 *         required: true
 *         type: integer
 *       - name: puppy
 *         description: Puppy object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Puppy'
 *     responses:
 *       200:
 *         description: Successfully updated
 */
// router.put('/api/puppies/:id', db.updatePuppy);

/**
 * @swagger
 * /api/puppies/{id}:
 *   delete:
 *     operationId: removePuppy
 *     tags:
 *       - Puppies
 *     description: Deletes a single puppy
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Puppy's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
// router.delete('/api/puppies/:id', db.removePuppy);


module.exports = router;