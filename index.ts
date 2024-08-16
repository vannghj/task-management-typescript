import express, { Express, Request, Response} from "express";
import dotenv from "dotenv"
import * as database from "./config/database"
import mainV1routes from "./api/v1/routes/index.route";
import bodyParser from "body-parser";
dotenv.config();
database.connect();

const app:Express = express();
const port:number | string = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

mainV1routes(app);
app.listen(port, ()=> {
    console.log(`app listening on port ${port}`);
})