import { Router } from 'express';
import { container } from '../container';
import type { UserController } from '../controllers/user.controller';
import { validate } from '../middleware/validate';
import { UserSchema } from '../schema/user.schema';

const userRoutes = Router();

const userController = container.get<UserController>('UserController');

/**
 * @openapi
 * tags:
 *   name: Users
 *   description: User management and retrieval
 * /components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *       required:
 *         - id
 *         - name
 *         - email
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *             required:
 *               - name
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request
 * /users/id/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 * /users/email/{email}:
 *   get:
 *     summary: Get user by email
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *           format: email
 */

userRoutes.post(
   '/',
   validate(UserSchema.registerUser),
   userController.createUser
);
userRoutes.get(
   '/id/:id',
   validate(UserSchema.userIdParam),
   userController.getUserById
);
userRoutes.get(
   '/email/:email',
   validate(UserSchema.userEmailParam),
   userController.getUserByEmail
);
userRoutes.put(
   '/:id/password',
   validate(UserSchema.updatePassword),
   userController.updateUserPassword
);
userRoutes.delete(
   '/:id',
   validate(UserSchema.userIdParam),
   userController.deleteUser
);

export { userRoutes };
