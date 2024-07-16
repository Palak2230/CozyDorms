import { User } from "../models/User";

export interface IPg {
    title: string;
    address: string;
    city: string;
    about: string;
    owner: User;
    tenantgender: string;
    ownercontact: string;
    addedAmenities: any[],
    addedRules: any[],
    addedRooms: any[],
    images: any[]

}