import { Request, Response } from 'express';
import knex from '../database/connection';

/**
 * @class PackageController 
 * @description class that will implement the funtionalities of user controlling the flux of the data between the clien and database
 */
class PackageController {
    /**
     * @memberof PackageController 
     * @param {object} req Request made to the route.
     * @param {object} res Response defined by the controller.
     * @returns {object} Object respresenting a response message.
     */
    async create(req: Request, res: Response) {
        try {
            const { 
                name,
                price,
                activation,
                active
             } = req.body;
            const create = await knex("package").insert({ name, price, activation, active });
            const id = create[0];

            return res.json({ id, name, price, activation, active });
        } catch(error) {
            return res.status(500).json(error);
        }
    }

    /**
     * @memberof PackageController
     * @param {object} req Request made to the route.
     * @param {object} res Response defined by the controller.
     * @returns {object} Object respresenting a response message.
     */
    async index(req: Request, res: Response) {
        try {
            const packages = await knex("package").select("*");

            return res.json(packages);
        } catch(error) {
            return res.status(500).json(error);
        }
    }

    /**
     * @memberof PackageController
     * @param {object} req Request made to the route.
     * @param {object} res Response defined by the controller.
     * @returns {object} Object respresenting a response message.
     */
    async show(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const pack = await knex("package").where({ id }).select("*");

            return res.json(pack);
        } catch(error) {
            return res.status(500).json(error);
        }
    }

    /**
     * @memberof PackageController
     * @param {object} req Request made to the route.
     * @param {object} res Response defined by the controller.
     * @returns {object} Object respresenting a response message.
     */
    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const {
                name,
                price,
                activation,
                active
            } = req.body;
            const update = await knex("package").where({ id }).select("id");

            return res.json(update ? { id, name, price, activation, active, isUpdated: true } : { isUpdated: false });
        } catch(error) {
            return res.status(500).json(error);
        }
    }

    /**
     * @memberof PackageController
     * @param {object} req Request made to the route.
     * @param {object} res Response defined by the controller.
     * @returns {object} Object respresenting a response message.
     */
    async remove(req: Request, res: Response) {
        try {
            const { id } = req.body;
            const remove = await knex("package").where({ id }).del();

            return res.json(remove ? { id, isRemoved: true } : { isRemoved: false });
        } catch(error) {
            return res.status(500).json(error);
        }
    }

}

export default PackageController;
