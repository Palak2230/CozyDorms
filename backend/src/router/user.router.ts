
import { Router } from "express";
import { sample_users } from "../data";
import { User, UserModel } from "../models/user.model";
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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


router.post('/login', expressAsyncHandler(
    async (req: any, res: any) => {
        const { email, password } = req.body;
        // const encryptedPassword = await bcrypt.hash(password, 10);
        // console.log(encryptedPassword);
        // const user = await UserModel.findOne({ email, password });
        const user = await UserModel.findOne({ email })
            .then(user => {
                //if user not exist than return status 400
                if (!user) { res.status(400).send("Incorrect email or password !"); }

                else {
                    bcrypt.compare(password, user.password, (err: any, data: any) => {

                        if (err) res.status(400).send("Incorrect email or password !");
                        if (data) {
                            res.json(generateTokenResponse(user));
                        } else {
                            return res.status(401).json({ msg: "Invalid credencial" })
                        }

                    })
                }

            })

    }));

const generateTokenResponse = (user: any) => {
    const token = jwt.sign({
        email: user.email, isAdmin: user.isAdmin,
    }, "someRandomText")
    user.token = user;
    return user;
}
router.post('/register', expressAsyncHandler(
    async (req: any, res: any) => {
        const { name, email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) res.status(400).send("User already exists !");
        else {
            const encryptedPassword = await bcrypt.hash(password, 10);
            const newUser: User = {
                id: '',
                name: name,
                email: email.toLowerCase(),
                password: encryptedPassword,
                isOwner: false,
            }
            const dbuser = await UserModel.create(newUser);
            res.json(generateTokenResponse(dbuser));
        }

    }));

export default router;