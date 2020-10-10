const UsersController = require('./controller/users.controller');
const ValidationMiddleware = require('./../common/middlewares/auth.validation.middleware');
const PermissionMiddleware = require('./../common/middlewares/auth.permission.middleware');
const config = require('../common/config/env.config');

const ADMIN = config.permissionLevels.ADMIN;
const PAID = config.permissionLevels.PAID_USER;
const FREE = config.permissionLevels.NORMAL_USER;

exports.routeConfig = (app) => {

    app.post('/users', [
        UsersController.insert
    ]);

    app.post('/notes', [
        UsersController.insertNotes
    ]);

    app.get('/users', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(PAID),
        UsersController.list
    ]);

    app.get('/users/:userId', [
        UsersController.getById
    ]);

    app.patch('/users/:userId', [
        UsersController.patchById
    ]);

    app.delete('/users/:userId', [
        UsersController.removeById
    ]);

}