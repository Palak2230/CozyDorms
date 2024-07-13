
import { Router } from "express";
import { sample_pgs } from "../data";
import { Pg, PgModel } from "../models/pg.model";
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
        console.log(sample_pgs);

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

router.get('/search/id', expressAsyncHandler(
    async (req: any, res: any) => {
        const pg = await PgModel.findById(req.query.q);
        res.json(pg);
    }));


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
router.post('/add', expressAsyncHandler(
    async (req: any, res: any) => {
        // const user = await UserModel.findOne({ email });
        // if (user) res.status(400).send("User already exists !");
        // else {
        //     const encryptedPassword = await bcrypt.hash(password, 10);
        //     const newUser: User = {
        //         id: '',
        //         name: name,
        //         email: email.toLowerCase(),
        //         password: encryptedPassword,
        //         isOwner: false,
        //     }
        //     const dbuser = await UserModel.create(newUser);
        //     // res.json(generateTokenResponse(dbuser));
        // }

        console.log(req.body);
        const obj = req.body;
        const newPg: Pg = {
            id: '',
            name: obj.title,
            address: obj.address,
            locality: 'de',
            city: obj.city,
            price: 33,
            // tags: [''],
            stars: 0,
            ratingcnt: 0,
            imageUrl: obj.images,
            reviews: [],
            rooms: obj.addedRooms,
            amenities: obj.addedAmenities,
            rules: obj.addedRules
        }
        const dbpg = await PgModel.create(newPg);
        res.send(dbpg);
    }));
// router.get('/reviews/search', expressAsyncHandler(
//     async (req: any, res: any) => {
//         try {
//             // const searchRegex = new RegExp(req.query.q as string, 'i');
//             const localities = await PgModel.distinct('locality', { city: { $regex: searchRegex } });
//             res.json(localities);
//         } catch (error) {
//             console.error('Error searching localities:', error);
//             res.status(500).json({ error: 'Internal Server Error' });
//         }
//     })
// );
export default router;