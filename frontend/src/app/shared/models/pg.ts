
import { Review } from "./Review";
import { Rooms } from "./rooms";
import { Amenity } from "./amenity";
import { User } from "./User";


export class Pg {
    id!: string;
    name!: string;
    address!: string;
    about!: string;
    tenantgender!: string;
    city!: string;
    owner !: User;
    price!: number;
    stars!: number;
    ratingcnt!: number;
    imageUrl!: string[];
    reviews!: Review[];
    rooms!: Rooms[];
    amenities!: Amenity[];
    rules!: Amenity[];
}