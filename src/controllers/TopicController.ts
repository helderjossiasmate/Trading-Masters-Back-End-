import { Request, Response } from 'express';
import knex from '../database/connection';

/**
 * @class TopicController 
 * @description class that will implement the funtionalities of user controlling the flux of the data between the clien and database
 */
class TopicController {
     /**
     * @memberof TopicController
     * @param {object} req Request made to the route.
     * @param {object} res Response defined by the controller.
     * @returns {object} Object respresenting a response message.
     */
    async create(req: Request, res: Response) {
        try {
            const {
                name,
                description,
                video
            } = req.body;
            const topic = await knex("topic").insert({ name, description, video });
            const id = topic[0];

            return res.json({ id, name, description, video });
        } catch(error) {
            return res.status(500).json(error);
        }
    }

    /**
     * @memberof TopicController
     * @param {object} req Request made to the route.
     * @param {object} res Response defined by the controller.
     * @returns {object} Object respresenting a response message.
     */
    async index(req: Request, res: Response) {
        try {
            const topics = await knex("topic").select("*");

            return res.json(topics);
        } catch(error) {
            return res.status(500).json(error);
        }
    } 

    /**
     * @memberof TopicControler
     * @param {object} req Request made to the route.
     * @param {object} res Response defined by the controller.
     * @returns {object} Object respresenting a response message.
     */
    async show(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const topic = await knex("topic").where("id", id).select("*");

            return res.json(topic);
        } catch(error) {
            return res.status(500).json(error);
        }
    }

    /**
     * @memberof TopicControler
     * @param {object} req Request made to the route.
     * @param {object} res Response defined by the controller.
     * @returns {object} Object respresenting a response message.
     */
    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const {
                name,
                description,
                video
            } = req.body;
            const update = await knex("topic").where({ id }).update({ id, name, description, video });

            return res.json(update ? { id, name, description, video, isUpdated: true } : { isUpdated: false });
        } catch(error) {
            return res.status(500).json(error);
        }
    }

    async remove(req: Request, res: Response) {
        try {
            const { id } = req.body;
            const remove = await knex("topic").where({ id }).del();

            return res.json(remove ? { id, isRemoved: true } : { isRemoved: false });
        } catch(error) {
            return res.status(500).json(error);
        }
    }
}

export default TopicController;