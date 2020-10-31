import { Request, Response } from 'express';
import knex from '../database/connection';
import bcrypt from 'bcrypt';


/**
 * @class AdminController 
 * @description class that will implement the funtionalities of user controlling the flux of the data between the clien and database
 */
class AdminController {
    /**
     * @memberof AdminController
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
                verified
            } = req.body;

            // Cryptographi
            const salt = await bcrypt.genSalt();
            const password = await bcrypt.hash(hashedPassword, salt);
            
            const admin = await knex("admin").insert({ name, surname, email, username, password, salt, verified });
            const id = admin[0];

            return res.json({ id, name, surname, email, username, verified });
        } catch(error) {
            return res.status(500).json(error);
        }
    }

    /**
     * @memberof AdminControler
     * @param {object} req Request made to the route.
     * @param {object} res Response defined by the controller.
     * @returns {object} Object respresenting a response message.
     */
    async index(req: Request, res: Response) {
        try {
            const admin = await knex("admin").select("*");

            return res.json(admin);
        } catch(error) {
            return res.status(500).json(error);
        }
    }

    /**
     * @memberof AdminControler
     * @param {object} req Request made to the route.
     * @param {object} res Response defined by the controller.
     * @returns {object} Object respresenting a response message.
     */
    async show(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const admin = await knex("admin").where("id", id).select("*");

            return res.json(admin);
        } catch(error) {
            return res.status(500).json(error);
        }
    }

    /**
     * @memberof AdminController
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
             const update = await knex("admin").where({ id }).update({ name, surname, email, username, password, salt, verified, idpackage });

             return res.json(update ? { id, name, surname, email, username, password, salt, verified, idpackage, isUpdate: true } : { isUpdated: false });
        } catch(error) {
            return res.status(500).json(error);
        }
    }

    /**
     * @memberof AdminController
     * @param {object} req Request made to the route.
     * @param {object} res Response defined by the controller.
     * @returns {object} Object respresenting a response message.
     */
    async remove(req: Request, res: Response) {
        try {
            const { id } = req.body;
            const remove = await knex("admin").where({id}).del();

            return res.json(remove ? { id, isRemoved: true } : { isRemoved: false });
        } catch(error) {
            return res.status(500).json(error);
        }
    }
}

export default AdminController;