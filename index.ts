import express, { Express, Request, Response} from "express";
import dotenv from "dotenv"
import * as database from "./config/database"
import mainV1routes from "./api/v1/routes/index.route";
dotenv.config();
database.connect();

const app:Express = express();
const port:number | string = process.env.PORT;

mainV1routes(app);
app.listen(port, ()=> {
    console.log(`app listening on port ${port}`);
})