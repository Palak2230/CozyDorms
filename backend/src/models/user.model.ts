import { Schema, model } from "mongoose";

export interface User {
    id: string;
    name: string;
    image: string;
    email: string;
    password: string;
    contact: string;


}

export const UserSchema = new Schema<User>(
    {
        image: { type: String, required: true },
        name: { type: String, required: true },
        password: { type: String, required: true },
        email: { type: String, required: true },
        contact: { type: String },
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

export const UserModel = model<User>('User', UserSchema);
