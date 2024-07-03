import { Pg } from "./app/shared/models/pg";
export const sample_pgs: Pg[] = [
    {
        id: '1',
        name: 'A',
        address: 'near jdkfkc',
        locality: 'Kopar',
        city: 'Mumbai',
        price: 194,
        tags: { roomsOccupancy: ['Single Room', 'Double Room'], roomsAC: ['AC'], tenantType: ['Female'] },
        stars: 4.0,
        ratingcnt: 37,
        imageUrl: '../../../../assets/room-1.jpg',
    },
    {
        id: '2',
        name: 'B',
        address: 'near wkdk',
        locality: 'Kopar',
        city: 'Mumbai',
        price: 331,
        tags: { roomsOccupancy: ['Single Room'], roomsAC: ['AC', 'Non-Ac'], tenantType: ['Female'] },
        stars: 3.0,
        ratingcnt: 234,
        imageUrl: '../../../../assets/room-2.jpg',
    },
    {
        id: '3',
        name: 'C',
        address: 'near wkdk',
        locality: 'Nerul',
        city: 'Mumbai',
        price: 331,
        tags: { roomsOccupancy: ['Single Room', 'Double Room'], roomsAC: ['AC'], tenantType: ['Male', 'Female'] },
        stars: 2.0,
        ratingcnt: 234,
        imageUrl: '../../../../assets/room-2.jpg',
    }
]
export const sample_users: any[] = [
    {
        name: 'Palak',
        email: '21ucc072@lnmiit.ac.in',
        password: 'Palak1522',
    }
]
