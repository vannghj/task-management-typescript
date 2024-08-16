import {Request, Response} from "express";
import Task from "../models/task.model";
import paginationHelper from "../../../helpers/pagination";

export const index = async (req: Request, res:Response) =>{
    interface Find {
        deleted: boolean,
        status?: string,
    }
    const find: Find = {
        deleted: false,
    };
    if(req.query.status) {
        find.status = req.query.status.toString();
    }
    const sort = {};
    if(req.query.sortKey && req.query.sortValue) {
        const sortKey = req.query.sortKey.toString();
        sort[sortKey] = req.query.sortValue;
    }
    // phan trang
    const coutTask = await Task.countDocuments(find);
    let objectPagination = paginationHelper(
        {
            currentPage: 1,
            limitItem: 2
        },
        req.query,
        coutTask
    );
    //endphan trang
    const tasks = await Task
        .find(find)
        .sort(sort)
        .limit(objectPagination.limitItem)
        .skip(objectPagination.skip);
    res.json(tasks);
}

export const detail  = async (req: Request, res:Response) =>{
    const id: string = req.params.id;
    const task = await Task.findOne({
        deleted: false,
        _id: id,
    })
    res.json(task);
}