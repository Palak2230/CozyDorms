
import { Router } from "express";
import { sample_pgs } from "../data";
import { Pg, PgModel } from "../models/pg.model";
import { Review, ReviewModel } from "../models/reviews.model";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";
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

router.get('/search/id', expressAsyncHandler(
    async (req: any, res: any) => {
        const pg = await PgModel.findById(req.query.q);
        res.json(pg);
    }));


router.get('/cities', expressAsyncHandler(
    async (req: any, res: any) => {
        try {
            const cities = await PgModel.distinct('city');
  
            res.json(cities);
        } catch (error) {
            console.error('Error retrieving localities:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    })
);
router.post('/reviews', expressAsyncHandler(async (req: any, res: any) => {

    try {
        const objId = new mongoose.Types.ObjectId(req.body.id);
        const pg = await PgModel.findById(objId);

        if (!pg) {
            return res.status(404).send({ message: 'PG not found' });
        }

        const review = new ReviewModel({
            user: req.body.user,
            rating: req.body.rating,
            comment: req.body.comment,
        });

        const dbReview = await review.save();


        pg.stars = pg.stars * pg.ratingcnt + dbReview.rating;
        pg.ratingcnt = pg.ratingcnt + 1;
        pg.stars = pg.stars / pg.ratingcnt;
        pg.reviews.push(dbReview);
        await pg.save();


        return res.status(201).send(pg.reviews);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Internal Server Error' });
    }
}));
router.post('/edit', expressAsyncHandler(
    async (req: any, res: any) => {
  
        try {
            const objId = new mongoose.Types.ObjectId(req.body.id);
            const pg = await PgModel.findById(objId);

            if (!pg) {
                return res.status(404).send({ message: 'PG not found' });
            }
            const obj = req.body.pgadd;
            pg.name = obj.title,
                pg.address = obj.address,
                pg.city = obj.city,
                pg.owner.contact = obj.ownercontact,
                pg.about = obj.about,
                pg.tenantgender = obj.tenantgender,
                pg.imageUrl = obj.images,
                pg.rooms = obj.addedRooms,
                pg.amenities = obj.addedAmenities,
                pg.rules = obj.addedRules
            await pg.save();
      
            res.send(pg);
        }
        catch (error) {
            console.error(error);
            return res.status(500).send({ message: 'Internal Server Error' });
        }
    }));
router.post('/delete', expressAsyncHandler(async (req: any, res: any) => {
    try {
        const objId = new mongoose.Types.ObjectId(req.body.id);
       

        const result = await PgModel.deleteOne({ _id: objId });
        
        if (result.deletedCount === 1) {
            res.send('ok');
        } else {
            res.status(404).send({ message: 'PG not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
}));


router.post('/add', expressAsyncHandler(
    async (req: any, res: any) => {


        const obj = req.body;
        const newPg: Pg = {
            id: '',
            name: obj.title,
            address: obj.address,
            city: obj.city,
            owner: obj.owner,
            price: 33,
            about: obj.about,
            tenantgender: 'female',
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


export default router;