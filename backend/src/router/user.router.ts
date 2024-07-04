
import { Router } from "express";
import { sample_users } from "../data";
import { UserModel } from "../models/user.model";

// import jwt from 'jsonwebtoken';
// var jwt = require('jsonwebtoken');
const expressAsyncHandler = require("express-async-handler");
const router = Router();

router.get('/seed', expressAsyncHandler(
    async (req: any, res: any) => {
        const usercount = await UserModel.countDocuments();
        if (usercount > 0) {
            console.log('seed is already done !');
            return;
        }
        await UserModel.create(sample_users);
        res.send('seed is done!');
    })
);
router.get('/', expressAsyncHandler(
    async (req: any, res: any) => {
        const users = await UserModel.find();
        res.json(users);
    }));

// router.post('/login', (req: any, res: any) => {

//     const { email, password } = req.body;
//     const user = sample_users.find(user => user.email === email && user.password === password);
//     // if (user) {
//     //     res.send(generateTokenResponse(user));
//     // }
//     // else 
//     res.send(user);

// });
router.post('/login', expressAsyncHandler(
    async (req: any, res: any) => {
        const { email, password } = req.body;
        const users = await UserModel.findOne({ email, password });
        res.json(users);
    }));

// const generateTokenResponse = (user: any) => {
//     const token = jwt.sign({
//         email: user.email, isAdmin: user.isAdmin,
//     }, "someRandomText", {
//         expiresin: "30d",
//     }
//     )
//     user.token = user;
//     return user;
// }
router.post('/signup', expressAsyncHandler(
    async (req: any, res: any) => {
        const { email, password } = req.body;
        const users = await UserModel.findOne({ email });
        res.json(users);
    }));

export default router;