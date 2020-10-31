import express from 'express';
import UserController from './controllers/UserController';
import AdminController from './controllers/AdminController';
import TopicController from './controllers/TopicController';
import PackageController from './controllers/PackageController';

const routes = express.Router();

const userController = new UserController();
const adminController = new AdminController();
const topicController = new TopicController();
const packageController = new PackageController();

//User Routes
routes.get('/user', userController.index);
routes.get('/user/:id', userController.show);
routes.post('/user', userController.create);
routes.delete('/user', userController.remove);
routes.put('/user/:id', userController.update);
routes.get('/login', userController.login);

//Admin Routes
routes.get('/admin', adminController.index);
routes.get('/admin/:id', adminController.show);
routes.post('/admin', adminController.create);
routes.delete('/admin', adminController.remove);
routes.put('/admin/:id', adminController.update);

//Topic Routes
routes.get('/topic', topicController.index);
routes.get('/topic/:id', topicController.show);
routes.post('/topic', topicController.create);
routes.delete('/topic', topicController.remove);
routes.put('/topic/:id', topicController.update);

//Package Toutes
routes.get('/package', packageController.index);
routes.get('/package/:id', packageController.show);
routes.post('/package', packageController.create);
routes.delete('/package', packageController.remove);
routes.put('/package/:id', packageController.update);

export default routes;