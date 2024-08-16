import * as mongoose from "mongoose";

export const connect = async (): Promise<void> => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("connect");
    } catch (error) {
        console.log("error");
    }
}