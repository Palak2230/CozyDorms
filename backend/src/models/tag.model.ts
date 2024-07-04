import { Schema, model } from "mongoose";

// import { Tag } from "./Tag";
export interface Tag {
    roomsOccupancy: string[];
    roomsAC: string[];
    tenantType: string[];
}
export const TagSchema = new Schema(
    {
        roomsOccupancy: { type: [String], required: true },
        roomsAC: { type: [String], required: true },
        tenantType: { type: [String], required: true },
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
export const TagModel = model<Tag>('tag', TagSchema);