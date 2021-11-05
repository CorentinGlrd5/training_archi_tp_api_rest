import { Router } from 'express';
import { UnknownUserError } from '../errors/unknown-user.error';
import { UsersService } from '../services/users.service';

const usersRouter = Router();
const usersService = new UsersService();
const auth = require("../services/auth.service");

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Retrieve a list of users
 *     description: Retrieve a list of users
 */
usersRouter.get('/', (req, res) => {
    const users = usersService.getAllUsers();
    res.status(200).send(users);
})

/**
 * @openapi
 * /users/:userID:
 *   get:
 *     summary: Retrieve a user of users
 *     description: Retrieve a user of users
 */
 usersRouter.get('/:userID', (req, res) => {
    try {
        const user = usersService.getById(req.params.userID);
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

/**
 * @openapi
 * /users:
 *   post:
 *     summary: Create a new user
 *     description: creates a new user
 */
usersRouter.post('/', (req, res) => {
    try {
        const createUser = usersService.createUser(req.body);
        res.status(200).send(createUser);
    } catch (error) {
        res.status(400).send(error.message);
    }
})

/**
 * @openapi
 * /users/:userID:
 *   put:
 *     summary: Update a user
 *     description: Update a user
 */
usersRouter.put('/:userID', auth, (req, res) => {
    try {
        const updateUser = usersService.updateUser(req.params.userID, req.body);
        res.status(200).send(updateUser);
    } catch (error) {
        res.status(400).send(error.message);
    }
})

/**
 * @openapi
 * /users/:userID:
 *   delete:
 *     summary: Delete a user
 *     description: Delete a user
 */
usersRouter.delete('/:userID', (req, res) => {
    try {
        const deleteUser = usersService.deleteUser(req.params.userID)
        res.status(200).send(deleteUser);
    } catch (error) {
        if (error instanceof UnknownUserError) {
            res.status(404)
        } else {
            res.status(400)
        }
        res.send(error.message)
    }
})

export default usersRouter;