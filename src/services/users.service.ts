import { UnknownUserError } from '../errors/unknown-user.error'
import { UserDao } from '../dao/users.dao';
import { UserModel, UserWithToken } from '../models/user.model';

const uuid = require('uuid');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

export class UsersService {
    private userDAO: UserDao = new UserDao();

    public getAllUsers(): UserModel[] {
        return this.userDAO.list();
    }

    public getById(userID: string): UserModel {
        const book = this.userDAO.getByID(userID);
        if (!book) {
            throw new UnknownUserError('unknown book');
        }
        return book;
    }

    public createUser(user: UserModel) {
        const emailExist = this.userDAO.getByEmail(user.email);
        if (!this.checkUserToCreateIsValid(user)) {
            throw new Error('invalid user');
        }

        if (emailExist) {
            throw new Error('Cette utilisateur ayant comme email : ' + user.email + ", existe déjà ! De ce fait, nous ne pouvons pas le créer.");
        }

        const userToCreate = {
            ...user,
            id: uuid.v4()
        }
        return this.userDAO.create(userToCreate);
    }

    public updateUser(userID:string, user: UserModel): UserModel {
        const existingUser = this.userDAO.getByID(userID);
        if (!existingUser) {
            throw new UnknownUserError('unknown user')
        }
        const userToUpdate = {
            ...existingUser,
            ...user
        }

        return this.userDAO.update(userToUpdate)
    }

    public deleteUser(userID: string) {
        const user = this.userDAO.getByID(userID);
        if (!user) {
            throw new UnknownUserError('unknown user');
        }
        this.userDAO.delete(userID);
        return "L'utilisateur : " + user.firstName + " " + user.lastName + " a bien été supprimé !"
    }

    public login(email: string, password: string): UserWithToken {
        if (!email || !password) {
            throw new Error('all inputs are required');
        }

        const user = this.userDAO.getByEmail(email);
        if (user && user.password === password) {
            const token = jwt.sign(
                user,
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h"
                }
            );

            console.log("JWT : " + token);


            return {
                ...user,
                token
            }
        } else {
            throw new UnknownUserError()
        }
    }

    private checkUserToCreateIsValid(user: UserModel) {
        return user && user.email && user.password && user.firstName && user.lastName
    }
}