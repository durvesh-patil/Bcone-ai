export interface TransportRoute {
    id: string;
    origin: string;
    destination: string;
    mode: 'sea' | 'air' | 'rail' | 'truck';
    cost: number;
    time: number; // hours
    distance: number; // km
    carrier?: string;
    coordinates: {
        origin: [number, number]; // [lng, lat]
        destination: [number, number];
    };
}

export const transportNetwork: TransportRoute[] = [
    // Shanghai to Hamburg routes
    {
        id: 'sh-hh-sea-1',
        origin: 'Shanghai',
        destination: 'Hamburg',
        mode: 'sea',
        cost: 4500,
        time: 720, // 30 days
        distance: 19000,
        carrier: 'Maersk Line',
        coordinates: {
            origin: [121.47, 31.23],
            destination: [9.99, 53.55],
        },
    },
    {
        id: 'sh-hh-air-1',
        origin: 'Shanghai',
        destination: 'Hamburg',
        mode: 'air',
        cost: 15000,
        time: 24,
        distance: 8500,
        carrier: 'Lufthansa Cargo',
        coordinates: {
            origin: [121.47, 31.23],
            destination: [9.99, 53.55],
        },
    },
    {
        id: 'sh-hh-rail-1',
        origin: 'Shanghai',
        destination: 'Hamburg',
        mode: 'rail',
        cost: 7000,
        time: 336, // 14 days
        distance: 11000,
        carrier: 'China Railway Express',
        coordinates: {
            origin: [121.47, 31.23],
            destination: [9.99, 53.55],
        },
    },

    // Mumbai to Rotterdam routes
    {
        id: 'mb-rt-sea-1',
        origin: 'Mumbai',
        destination: 'Rotterdam',
        mode: 'sea',
        cost: 3800,
        time: 480, // 20 days
        distance: 10500,
        carrier: 'MSC',
        coordinates: {
            origin: [72.88, 19.08],
            destination: [4.48, 51.92],
        },
    },
    {
        id: 'mb-rt-air-1',
        origin: 'Mumbai',
        destination: 'Rotterdam',
        mode: 'air',
        cost: 12000,
        time: 18,
        distance: 6500,
        carrier: 'Emirates SkyCargo',
        coordinates: {
            origin: [72.88, 19.08],
            destination: [4.48, 51.92],
        },
    },

    // Singapore to Los Angeles routes
    {
        id: 'sg-la-sea-1',
        origin: 'Singapore',
        destination: 'Los Angeles',
        mode: 'sea',
        cost: 5200,
        time: 600, // 25 days
        distance: 14000,
        carrier: 'CMA CGM',
        coordinates: {
            origin: [103.85, 1.29],
            destination: [-118.24, 34.05],
        },
    },
    {
        id: 'sg-la-air-1',
        origin: 'Singapore',
        destination: 'Los Angeles',
        mode: 'air',
        cost: 18000,
        time: 20,
        distance: 14000,
        carrier: 'FedEx',
        coordinates: {
            origin: [103.85, 1.29],
            destination: [-118.24, 34.05],
        },
    },

    // Tokyo to New York routes
    {
        id: 'ty-ny-sea-1',
        origin: 'Tokyo',
        destination: 'New York',
        mode: 'sea',
        cost: 6000,
        time: 720, // 30 days
        distance: 18000,
        carrier: 'NYK Line',
        coordinates: {
            origin: [139.69, 35.68],
            destination: [-74.01, 40.71],
        },
    },
    {
        id: 'ty-ny-air-1',
        origin: 'Tokyo',
        destination: 'New York',
        mode: 'air',
        cost: 16000,
        time: 16,
        distance: 11000,
        carrier: 'ANA Cargo',
        coordinates: {
            origin: [139.69, 35.68],
            destination: [-74.01, 40.71],
        },
    },

    // Shenzhen to London routes
    {
        id: 'sz-ld-sea-1',
        origin: 'Shenzhen',
        destination: 'London',
        mode: 'sea',
        cost: 4200,
        time: 672, // 28 days
        distance: 16500,
        carrier: 'COSCO',
        coordinates: {
            origin: [114.06, 22.54],
            destination: [-0.13, 51.51],
        },
    },
    {
        id: 'sz-ld-air-1',
        origin: 'Shenzhen',
        destination: 'London',
        mode: 'air',
        cost: 14000,
        time: 22,
        distance: 9500,
        carrier: 'British Airways Cargo',
        coordinates: {
            origin: [114.06, 22.54],
            destination: [-0.13, 51.51],
        },
    },
];
