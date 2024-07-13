import { Schema, model, Types } from "mongoose";
import { Tag, TagSchema } from "./tag.model";
import { Review, ReviewSchema } from "./reviews.model";

export interface Rooms {
    occupancy: number;
    type: string;
    rooms: number;
    vacancies: number;
    rent: number;
    deposit: number;

}
export const RoomSchema = new Schema<Rooms>(
    {
        occupancy: { type: Number, required: true },
        type: { type: String, required: true },
        rooms: { type: Number, required: true },
        vacancies: { type: Number, required: true },
        rent: { type: Number, required: true },
        deposit: { type: Number, required: true },
    },
    {
        toJSON: {
            virtuals: true,
        },
        toObject: {
            virtuals: true,
        },
        timestamps: true
    }
);
