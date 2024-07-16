import { Schema, model, Types } from "mongoose";
import { User, UserModel, UserSchema } from "./user.model";

export interface Review {
    user: User;
    comment: string;
    rating: number;
}

export const ReviewSchema = new Schema<Review>(
    {
        user: { type: UserSchema, required: true },
        comment: { type: String, required: true },
        rating: { type: Number, required: true },
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

export const ReviewModel = model<Review>('Review', ReviewSchema);
