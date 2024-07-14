import { Schema, model, Types } from "mongoose";
import { Tag, TagSchema } from "./tag.model";
import { Review, ReviewSchema } from "./reviews.model";

import { Rooms, RoomSchema } from "./rooms.model";
import { Amenity, AmenitySchema } from "./amenity.model";
export interface Pg {
    id: string;
    name: string;
    address: string;
    city: string;
    about: string;
    tenantgender: string;
    price: number;
    stars: number;
    ratingcnt: number;
    imageUrl: string[];
    reviews: Review[];
    rooms: Rooms[];
    amenities: Amenity[];
    rules: Amenity[];
}

export const PgSchema = new Schema<Pg>(
    {
        name: { type: String, required: true },
        address: { type: String, required: true },

        tenantgender: { type: String, required: true },
        about: { type: String, required: true },
        city: { type: String, required: true },
        price: { type: Number, required: true },
        stars: { type: Number, required: true },
        imageUrl: { type: [String], required: true },
        ratingcnt: { type: Number, required: true },
        // tags: { type: TagSchema, required: true },
        reviews: { type: [ReviewSchema], default: [] },
        rooms: { type: [RoomSchema], default: [] },
        amenities: { type: [AmenitySchema], default: [] },
        rules: { type: [AmenitySchema], default: [] }
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

export const PgModel = model<Pg>('Pg', PgSchema);
