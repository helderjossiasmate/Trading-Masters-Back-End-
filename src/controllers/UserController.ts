import { Request, Response } from 'express';
import knex from '../database/connection';
import bcrypt from 'bcrypt';


/**
 * @class UserController 
 * @description class that will implement the funtionalities of user controlling the flux of the data between the clien and database
 */
class UserController {
    /**
     * @memberof UserController
     * @param {object} req Request made to the route.
     * @param {object} res Response defined by the controller.
     * @returns {object} Object respresenting a response message.
     */
    async create(req: Request, res: Response) {
        try {
            const {
                name,
                surname,
                email,
                username,
                hashedPassword,
                verified,
                idpackage,
            } = req.body;
            // Cryptographi
            const salt = await bcrypt.genSalt();
            const password = await bcrypt.hash(hashedPassword, salt);

            const user = await knex("user").insert({ name, surname, email, username, password, salt, verified, idpackage });
            const id = user[0];

            return res.json({ id, name, surname, email, username, verified, idpackage });
        } catch(error) {
            return res.status(500).json(error);
        }
    }

    /**
     * @memberof UserController
     * @param {object} req Request made to the route.
     * @param {object} res Response defined by the controller.
     * @returns {object} Object respresenting a response message.
     */
    async index(req: Request, res: Response) {
        try {
            const users = await knex("user").select("*");

            return res.json(users);
        } catch(error) {
            return res.status(500).json(error);
        }
    }
    
    /**
     * @memberof UserController
     * @param {object} req Request made to the route.
     * @param {object} res Response defined by the controller.
     * @returns {object} Object respresenting a response message.
     */
    async show(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const user = await knex("user").where("id", id).select("*");

            return res.json(user);
        } catch(error) {
            return res.status(500).json(error);
        }
    }

    /**
     * @memberof UserController
     * @param {object} req Request made to the route.
     * @param {object} res Response defined by the controller.
     * @returns {object} Object respresenting a response message.
     */
    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { 
                name,
                surname,
                email,
                username,
                password,
                salt,
                verified,
                idpackage
             } = req.body;
             const update = await knex("user").where({ id }).update({ name, surname, email, username, password, salt, verified, idpackage });

             return res.json(update ? { id, name, surname, email, username, password, salt, verified, idpackage, isUpdate: true } : { isUpdated: false });
        } catch(error) {
            return res.status(500).json(error);
        }
    }

    /**
     * @memberof UserController
     * @param {object} req Request made to the route.
     * @param {object} res Response defined by the controller.
     * @returns {object} Object respresenting a response message.
     */
    async remove(req: Request, res: Response) {
        try {
            const { id } = req.body;
            const remove = await knex("user").where({id}).del();

            return res.json(remove ? { id, isRemoved: true } : { isRemoved: false });
        } catch(error) {
            return res.status(500).json(error);
        }
    }

    /**
     * @memberof UserController
     * @param {object} req Request made to the route.
     * @param {object} res Response defined by the controller.
     * @returns {object} Object respresenting a response message.
     */
    async login(req: Request, res: Response) {
        try {
            const {
                email,
                password
            } = req.body;

            if (!email) {
                return res.status(400).json('Please enter email')
            }
                
            const user = await knex("user").where("email", email).select("password");

            if(await bcrypt.compare(password, String(user[0].password))) {
                res.json('Sucess');
            } else {
                res.json('Not Allowed');
            }
            //return res.json(user);
        } catch(error) {
            return res.status(500).json(error);
        }
    }
}
export default UserController;