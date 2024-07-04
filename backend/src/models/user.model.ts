import { Schema, model } from "mongoose";

// import { Tag } from "./Tag";
export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    isOwner: boolean;
}
export const UserSchema = new Schema<User>(
    {
        name: { type: String, required: true },
        password: { type: String, required: true },
        email: { type: String, required: true },
        isOwner: { type: Boolean, required: true },
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
export const UserModel = model<User>('user', UserSchema);