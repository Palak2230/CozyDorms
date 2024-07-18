
import { Router } from "express";
import { sample_users } from "../data";
import { User, UserModel } from "../models/user.model";
import { ReviewModel } from "../models/reviews.model";
import { PgModel } from "../models/pg.model";
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
        console.log('hey');
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
                            res.json(user);
                        } else {
                            return res.status(401).json({ msg: "Invalid credential" })
                        }

                    })
                }

            })

    }));

const generateTokenResponse = (user: any) => {
    const token = jwt.sign({
        email: user.email
    }, "someRandomText")
    user.token = user;
    console.log(user);
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
                contact: ""
            }
            const dbuser = await UserModel.create(newUser);
            res.json(generateTokenResponse(dbuser));
        }

    }));

router.post('/update-password', expressAsyncHandler(
    async (req: any, res: any) => {
        const { email, password } = req.body;

        const user = await UserModel.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(404).send("User not found.");
        }

        const encryptedPassword = await bcrypt.hash(password, 10);
        user.password = encryptedPassword;
        await user.save();

        res.json({ message: "Password updated successfully." });
    }
));

router.post('/userproperty', expressAsyncHandler(
    async (req: any, res: any) => {
        console.log(req.body);
        const pg = await PgModel.find({ owner: { email: req.body.email } });
        res.json(pg);
    }));

export default router;