import {Request, Response} from "express";
import md5 from "md5";
import User from "../models/user.model";
import {generateRandomString} from "../../../helpers/generate";
export const register = async (req:Request, res:Response) => {
    try{
        const existEmail = await User.findOne({
            email: req.body.email,
            deleted: false,
        });

        if(existEmail) {
            res.json({
                code : 400,
                message: "Email da ton tai"
            });
        } else {
            req.body.password = md5(req.body.password);
            const user = new User({
                fullName: req.body.fullName,
                email: req.body.email,
                password: req.body.password,
                token: generateRandomString(30)
            })
            await user.save();
            const token = user.token;
            res.cookie("token", token);
            res.json({
                code: 200,
                message: "Tao tai khoan thanh cong",
                token: token
            })
        }
    } catch (error) {
        res.json({
            code: 400,
            message: "Khong ton tai"
        })
    }
}
export const login = async (req:Request, res:Response) => {
    try{
        const email:string = req.body.email;
        const password:string = req.body.password;
        const user = await User.findOne({
            email: email,
            deleted: false
        })
        if(!user) {
            res.json({
                code:400,
                message:" Email khong ton tai",
            });
            return;
        }
        if(md5(password) !== user.password) {
            res.json({
                code:400,
                message:"Mat khau khong dung",
            });
            return;
        }
        const token = user.token;
        res.cookie("token", token);
        res.json({
            code: 200,
            message: "Dang nhap thanh cong",
            token:token
        })

    } catch (error) {
        res.json({
            code: 400,
            message: "Khong ton tai"
        })
    }
}
export const detail = async (req:Request, res:Response) => {
    try{
        res.json({
            code: 200,
            message: "Thanh cong",
            info: req["user"]
        })
    } catch (error) {
        res.json({
            code: 400,
            message: "Khong ton tai"
        })
    }
}