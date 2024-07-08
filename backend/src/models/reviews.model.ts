import { Schema, model, Types } from "mongoose";
import { User, UserModel } from "./user.model";

export interface Review {
    user: User;
    comment: string;
    rating: number;
    imageUrls: string[];
}

export const ReviewSchema = new Schema<Review>(
    {
        user: { type: Types.ObjectId, ref: 'User', required: true },
        comment: { type: String, required: true },
        rating: { type: Number, required: true },
        imageUrls: { type: [String] },
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
