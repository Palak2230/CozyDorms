import { Tag } from "./Tag";
import { Review } from "./Review";
import { Rooms } from "./rooms";


export class Pg {
    id!: string;
    name!: string;
    address!: string;
    locality!: string;
    city!: string;
    pincode!: number;
    price!: number;
    tags?: Tag;
    stars!: number;
    ratingcnt!: number;
    imageUrl !: string;
    reviews?: Review[];
    rooms?: Rooms[];
}