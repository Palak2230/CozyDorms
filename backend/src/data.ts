
export const sample_pgs: any[] = [
    {
        id: '1',
        name: 'A',
        address: 'Shakti Nagar Colony , Near V-Mart ,Jhansi',
        locality: 'Kopar',
        city: 'Mumbai',
        price: 194,
        tags: { roomsOccupancy: ['Single Room', 'Double Room'], roomsAC: ['AC'], tenantType: ['Female'] },
        stars: 4.0,
        ratingcnt: 37,
        imageUrl: '../../../../assets/room-1.jpg',
        reviews: [],
        rooms: [
            {
                roomtype: 'Single Room AC',
                rooms: 5,
                vacancies: 7,
                rent: 10000,
                deposit: 7000,

            },
            {
                roomtype: 'Double Room Non-AC',
                rooms: 20,
                vacancies: 12,
                rent: 6000,
                deposit: 4000,

            }
        ]
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
        reviews: [],
        rooms: []
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
        reviews: [],
        rooms: [],
    }
]

export const sample_localities: any[] = [
    {
        name: 'Nerul',
        city: 'Mumbai',
    },
    {
        name: 'Kopar',
        city: 'Delhi',
    },
    {
        name: 'Kopar',
        city: 'Mumbai',
    }
]
export const sample_users: any[] = [
    {
        id: 1,
        name: 'Palak',
        email: 'palak',
        password: '22',
        isOwner: false,
    },
    {
        id: 1,
        name: 'Palak',
        email: 'Palak',
        password: '22',
        isOwner: false,
    }
]
