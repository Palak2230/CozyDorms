import { Tag } from "./Tag";
import { Review } from "./Review";
import { Rooms } from "./rooms";
import { Amenity } from "./amenity";


export class Pg {
    // id!: string;
    // name!: string;
    // address!: string;
    // city!: string;
    // price!: number;
    // tags?: Tag;
    // stars!: number;
    // ratingcnt!: number;
    // imageUrl !: string;
    // reviews?: Review[];
    // rooms?: Rooms[];

    id!: string;
    name!: string;
    address!: string;
    about!: string;
    tenantgender!:string;
    city!: string;
    price!: number;
    stars!: number;
    ratingcnt!: number;
    imageUrl!: string[];
    reviews!: Review[];
    rooms!: Rooms[];
    amenities!: Amenity[];
    rules!: Amenity[];
}