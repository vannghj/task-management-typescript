import express, { Express, Request, Response} from "express";
import dotenv from "dotenv"
import * as database from "./config/database"
import Task from "./models/task.model";
dotenv.config();
database.connect();

const app:Express = express();
const port:number | string = process.env.PORT;

app.get("/tasks", async (req: Request, res:Response) =>{
    const tasks = await Task.find({
        deleted: false,
    })
    console.log(tasks);
    res.json(tasks);
})
app.get("/tasks/detail/:id", async (req: Request, res:Response) =>{
    const id: string = req.params.id;
    const task = await Task.findOne({
        deleted: false,
        _id: id,
    })
    console.log(task);
    res.json(task);
})

app.listen(port, ()=> {
    console.log(`app listening on port ${port}`);
})