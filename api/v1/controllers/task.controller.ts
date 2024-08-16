import {Request, Response} from "express";
import Task from "../models/task.model";
import paginationHelper from "../../../helpers/pagination";
import searchHelper from "../../../helpers/search";

export const index = async (req: Request, res:Response) =>{
    interface Find {
        deleted: boolean,
        status?: string,
        title?: RegExp
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
    //tim kiem
    const objectSearch = searchHelper(req.query);
    let keyword = "";
    if(objectSearch.regex) {
        find.title = objectSearch.regex;
    }
    //tim kiem
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
export const changeStatus  = async (req: Request, res:Response) =>{
    try{
        const id:string = req.params.id;
        const status:string = req.body.status;
        await Task.updateOne({
            _id:id
        }, {
            status: status,
        })
        res.json({
            code: 200,
            message: "Cap nhat trang thai thanh cong"
        })
    } catch (error) {
        res.json({
            code: 400,
            message: "Khong ton tai"
        })
    }
}
export const changeMulti = async (req, res) => {
    try{
        const ids: string[] = req.body.ids;
        const key: string = req.body.key;
        const value: string = req.body.value;
        switch (key) {
            case "status" :
                await Task.updateMany({
                    _id: {$in: ids}
                }, {
                    status: value
                });
                res.json({
                    code: 200,
                    message: "Cap nhat trang thai thanh cong"
                })
                break;
            case "delete":
                await Task.updateMany({
                    _id: {$in: ids}
                }, {
                    deleted: true,
                    deleteAt: new Date()
                });
                res.json({
                    code: 200,
                    message: "Cap nhat trang thai thanh cong"
                })
                break;
            default:
                res.json({
                    code: 400,
                    message: "Khong ton tai"
                });
                break;
        }
    } catch (error) {
        res.json({
            code: 400,
            message: "Khong ton tai"
        })
    }
}
export const create = async (req, res) => {
    try{
        const task = new Task(req.body);
        const data = await task.save();
        res.json({
            code: 400,
            message: "Tao thanh cong",
            data: data
        });
    } catch (error) {
        res.json({
            code: 400,
            message: "Khong ton tai"
        })
    }
}
export const edit = async (req, res) => {
    try{
        const id:string = req.params.id;
        await Task.updateOne({
            _id: id
        }, req.body);
        res.json({
            code: 400,
            message: "cap nhat thanh cong",
        });
    } catch (error) {
        res.json({
            code: 400,
            message: "Khong ton tai"
        })
    }
}

