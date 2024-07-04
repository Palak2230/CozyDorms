
import { Router } from "express";
import { sample_pgs } from "../data";
import { PgModel } from "../models/pg.model";
const expressAsyncHandler = require("express-async-handler");
const router = Router();

router.get('/seed', expressAsyncHandler(
    async (req: any, res: any) => {
        const pgcount = await PgModel.countDocuments();
        if (pgcount > 0) {
            console.log('seed is already done !');
            return;
        }
        await PgModel.create(sample_pgs);
        res.send('seed is done!');
    })
);

router.get('/', expressAsyncHandler(
    async (req: any, res: any) => {
        const pgs = await PgModel.find();
        res.json(pgs);
    }));

router.get('/search', expressAsyncHandler(
    async (req: any, res: any) => {
        const searchRegex = new RegExp(req.query.q, 'i');
        const pgs = await PgModel.find({ city: { $regex: searchRegex } });
        res.json(pgs);
    }));

// router.get('/localities', expressAsyncHandler(
//     async (req: any, res: any) => {
//         // const searchRegex = new RegExp(req.query.q, 'i');
//         // const pgs = await PgModel.find({ city: { $regex: searchRegex } });
//         const localities = await PgModel.distinct('locality').find();
//         console.log(localities);
//         res.json(localities);
//     }));



// router.get('/localities/search', expressAsyncHandler(
//     async (req: any, res: any) => {
//         const searchRegex = new RegExp(req.query.q, 'i');
//         const localities = await PgModel.distinct('locality').find({ city: { $regex: searchRegex } });
//         res.json(localities);
//     }));
router.get('/localities', expressAsyncHandler(
    async (req: any, res: any) => {
        try {
            const localities = await PgModel.distinct('locality');
            console.log(localities);
            res.json(localities);
        } catch (error) {
            console.error('Error retrieving localities:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    })
);

router.get('/localities/search', expressAsyncHandler(
    async (req: any, res: any) => {
        try {
            const searchRegex = new RegExp(req.query.q as string, 'i');
            const localities = await PgModel.distinct('locality', { city: { $regex: searchRegex } });
            res.json(localities);
        } catch (error) {
            console.error('Error searching localities:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    })
);
export default router;