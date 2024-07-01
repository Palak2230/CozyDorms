import { Tag } from "./Tag";

export class Pg {
    id!: string;
    name!: string;
    address!: string;
    locality!: string;
    city!: string;
    price!: number;
    tags?: Tag;
    stars!: number;
    ratingcnt!: number;
    imageUrl !: string;

}