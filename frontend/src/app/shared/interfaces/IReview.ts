import { User } from "../models/User";

export interface IReview {
    id: string;
    user: User;
    rating: number;
    comment: string;
}