import { Schema, model } from "mongoose";
import { Tag, TagSchema } from "./tag.model";

// import { Tag } from "./Tag";
export interface Pg {
    id: string;
    name: string;
    address: string;
    locality: string;
    city: string;
    price: number;
    tags?: Tag;
    stars: number;
    ratingcnt: number;
    imageUrl: string;

}
export const PgSchema = new Schema<Pg>(
    {
        name: { type: String, required: true },
        address: { type: String, required: true },
        locality: { type: String, required: true },
        city: { type: String, required: true },
        price: { type: Number, required: true },
        stars: { type: Number, required: true },
        imageUrl: { type: String, required: true },
        ratingcnt: { type: Number, required: true },
        tags: { type: TagSchema, required: true },

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
)
export const PgModel = model<Pg>('pg', PgSchema);