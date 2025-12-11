import { transportNetwork } from '../data/transportNetwork.js';

export interface RouteSegment {
    from: string;
    to: string;
    mode: 'sea' | 'air' | 'rail' | 'truck';
    cost: number;
    time: number; // in hours
    distance: number; // in km
    carrier?: string;
}

export interface OptimizedRoute {
    segments: RouteSegment[];
    totalCost: number;
    totalTime: number;
    totalDistance: number;
    score: number;
    carbonFootprint: number; // kg CO2
}

interface RouteRequest {
    origin: string;
    destination: string;
    priority: 'cost' | 'time' | 'balanced';
    weight?: number;
    deadline?: string;
}

// Calculate route score based on priority
function calculateScore(
    cost: number,
    time: number,
    priority: 'cost' | 'time' | 'balanced'
): number {
    switch (priority) {
        case 'cost':
            return 1 / cost; // Lower cost = higher score
        case 'time':
            return 1 / time; // Lower time = higher score
        case 'balanced':
            return 1 / (cost * 0.5 + time * 0.5); // Balance both
        default:
            return 0;
    }
}

// Calculate carbon footprint (simplified)
function calculateCarbon(segments: RouteSegment[]): number {
    const emissionFactors = {
        sea: 0.01, // kg CO2 per km
        air: 0.15,
        rail: 0.03,
        truck: 0.08,
    };

    return segments.reduce((total, segment) => {
        return total + segment.distance * emissionFactors[segment.mode];
    }, 0);
}

export async function optimizeRoute(
    request: RouteRequest
): Promise<{ routes: OptimizedRoute[]; request: RouteRequest }> {
    const { origin, destination, priority } = request;

    // Find all possible routes from transport network
    const possibleRoutes = transportNetwork.filter(
        (route) =>
            route.origin.toLowerCase().includes(origin.toLowerCase()) &&
            route.destination.toLowerCase().includes(destination.toLowerCase())
    );

    if (possibleRoutes.length === 0) {
        // Generate fallback routes
        return generateFallbackRoutes(request);
    }

    // Convert to optimized route format
    const optimizedRoutes: OptimizedRoute[] = possibleRoutes.map((route) => {
        const segments: RouteSegment[] = [
            {
                from: route.origin,
                to: route.destination,
                mode: route.mode,
                cost: route.cost,
                time: route.time,
                distance: route.distance,
                carrier: route.carrier,
            },
        ];

        const totalCost = route.cost;
        const totalTime = route.time;
        const totalDistance = route.distance;
        const score = calculateScore(totalCost, totalTime, priority);
        const carbonFootprint = calculateCarbon(segments);

        return {
            segments,
            totalCost,
            totalTime,
            totalDistance,
            score,
            carbonFootprint,
        };
    });

    // Sort by score (best first)
    optimizedRoutes.sort((a, b) => b.score - a.score);

    // Return top 3 routes
    return {
        routes: optimizedRoutes.slice(0, 3),
        request,
    };
}

function generateFallbackRoutes(
    request: RouteRequest
): { routes: OptimizedRoute[]; request: RouteRequest } {
    const { origin, destination, priority } = request;

    // Generate 3 realistic route options
    const baseDistance = 8000; // Assume ~8000km for demo
    const baseCost = 5000;
    const baseTime = 240; // 10 days in hours

    const routes: OptimizedRoute[] = [
        // Sea route (cheapest, slowest)
        {
            segments: [
                {
                    from: origin,
                    to: destination,
                    mode: 'sea',
                    cost: baseCost,
                    time: baseTime,
                    distance: baseDistance,
                    carrier: 'Maersk Line',
                },
            ],
            totalCost: baseCost,
            totalTime: baseTime,
            totalDistance: baseDistance,
            score: calculateScore(baseCost, baseTime, priority),
            carbonFootprint: baseDistance * 0.01,
        },
        // Air route (expensive, fast)
        {
            segments: [
                {
                    from: origin,
                    to: destination,
                    mode: 'air',
                    cost: baseCost * 3,
                    time: baseTime * 0.1, // 24 hours
                    distance: baseDistance * 0.9,
                    carrier: 'DHL Air Cargo',
                },
            ],
            totalCost: baseCost * 3,
            totalTime: baseTime * 0.1,
            totalDistance: baseDistance * 0.9,
            score: calculateScore(baseCost * 3, baseTime * 0.1, priority),
            carbonFootprint: baseDistance * 0.9 * 0.15,
        },
        // Multi-modal (balanced)
        {
            segments: [
                {
                    from: origin,
                    to: 'Dubai',
                    mode: 'sea',
                    cost: baseCost * 0.4,
                    time: baseTime * 0.5,
                    distance: baseDistance * 0.4,
                    carrier: 'MSC',
                },
                {
                    from: 'Dubai',
                    to: destination,
                    mode: 'rail',
                    cost: baseCost * 0.8,
                    time: baseTime * 0.3,
                    distance: baseDistance * 0.6,
                    carrier: 'Euro Rail Freight',
                },
            ],
            totalCost: baseCost * 1.2,
            totalTime: baseTime * 0.8,
            totalDistance: baseDistance,
            score: calculateScore(baseCost * 1.2, baseTime * 0.8, priority),
            carbonFootprint: baseDistance * 0.4 * 0.01 + baseDistance * 0.6 * 0.03,
        },
    ];

    // Sort by score
    routes.sort((a, b) => b.score - a.score);

    return { routes, request };
}
