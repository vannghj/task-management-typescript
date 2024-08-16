import {taskRoutes} from "./task.route";
import {Express} from "express";

const mainV1routes = (app: Express):void => {
    const version = "/api/v1";
    app.use(`${version}/tasks`,taskRoutes);
}
export default mainV1routes;