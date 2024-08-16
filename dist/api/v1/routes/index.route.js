"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const task_route_1 = require("./task.route");
const user_route_1 = require("./user.route");
const mainV1routes = (app) => {
    const version = "/api/v1";
    app.use(`${version}/tasks`, task_route_1.taskRoutes);
    app.use(`${version}/users`, user_route_1.userRoutes);
};
exports.default = mainV1routes;
