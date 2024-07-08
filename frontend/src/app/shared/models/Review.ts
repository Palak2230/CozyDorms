import { User } from "./User";
export class Review {
    id!: string;
    user!: User;
    comment!: string;
    rating!: number;
    imageUrls?: [string];
}