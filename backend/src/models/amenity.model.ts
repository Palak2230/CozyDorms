import { Schema, model } from "mongoose";

// import { Tag } from "./Tag";
export interface Amenity {
    icon: string;
    title: string;
}
export const AmenitySchema = new Schema(
    {
        icon: { type: String, required: true },
        title: { type: String, required: true },

    },
    {
        toJSON: {
            virtuals: true,
        },
        toObject: {
            virtuals: true,
        },
        timestamps: true,
    }
);
export const AmenityModel = model<Amenity>('tag', AmenitySchema);