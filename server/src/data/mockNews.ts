export interface NewsEvent {
    id: string;
    title: string;
    content: string;
    source: string;
    timestamp: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    category: string;
}

export function getMockNewsEvents(): NewsEvent[] {
    return [
        {
            id: 'red-sea-crisis',
            title: 'Houthi Attacks Force Major Shipping Lines to Avoid Red Sea',
            content:
                'Major container shipping lines including Maersk, MSC, and Hapag-Lloyd have suspended transit through the Red Sea following intensified Houthi missile attacks on commercial vessels. Ships are now being rerouted via the Cape of Good Hope, adding approximately 10-15 days to Asia-Europe routes and increasing fuel costs by $1 million per voyage. The Suez Canal, which normally handles 12% of global trade, has seen traffic drop by 40%. Industry analysts estimate this will add $50,000-100,000 per container on affected routes. The situation shows no signs of immediate resolution, with continued military activity in the region.',
            source: 'Reuters',
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
            severity: 'critical',
            category: 'Geopolitical',
        },
        {
            id: 'hamburg-strike',
            title: 'Hamburg Port Workers Announce 2-Week Strike Over Pay Dispute',
            content:
                "Dockworkers at the Port of Hamburg, Germany's largest seaport, have announced a 2-week strike starting next Monday over wage negotiations. The strike will halt container operations at all terminals, affecting approximately 300 vessels scheduled to dock during this period. Hamburg handles over 8 million TEUs annually, making it Europe's third-busiest port. Alternative ports like Rotterdam and Antwerp are already operating near capacity and may struggle to absorb diverted traffic. Shipping lines are advising customers to expect delays of 3-5 days even after the strike ends due to backlog clearance. Trucking rates to alternative ports have already increased by 15%.",
            source: 'Bloomberg',
            timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
            severity: 'high',
            category: 'Labor',
        },
        {
            id: 'us-china-tariff',
            title: 'US Announces 25% Tariff on Chinese Electronics Effective December 15',
            content:
                'The United States Trade Representative has announced a new 25% tariff on electronic components and finished goods imported from China, effective December 15, 2025. This affects categories including semiconductors, consumer electronics, computer components, and telecommunications equipment, representing approximately $120 billion in annual trade. Companies have a 10-day window to expedite shipments under current tariff rates. Industry groups warn this will significantly increase costs for US consumers and businesses. Major manufacturers are already exploring alternative sourcing from Vietnam, Thailand, and Mexico. Customs brokers report a surge in duty engineering consultations as companies seek to minimize impact through product reclassification.',
            source: 'Wall Street Journal',
            timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
            severity: 'high',
            category: 'Trade Policy',
        },
        {
            id: 'singapore-typhoon',
            title: 'Typhoon Warning Issued for Singapore, Port Operations May Suspend',
            content:
                "Meteorological agencies have issued a typhoon warning for Singapore and surrounding waters. The Port of Singapore, world's second-busiest container port, may suspend operations for 2-3 days if the storm intensifies as predicted. Airlines have already begun canceling flights. Singapore handles over 37 million TEUs annually and serves as a critical transshipment hub for Southeast Asia. The last major weather disruption in 2019 caused a 5-day backlog affecting 200+ vessels. Shipping lines are advising customers to factor in potential delays of 3-5 days. The storm is expected to pass by early next week, with port operations resuming gradually thereafter.",
            source: 'The Straits Times',
            timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
            severity: 'medium',
            category: 'Weather',
        },
        {
            id: 'panama-drought',
            title: 'Panama Canal Reduces Daily Transits Due to Continued Drought',
            content:
                'The Panama Canal Authority has announced further reductions in daily vessel transits, cutting capacity from 36 to 24 ships per day due to critically low water levels in Gatun Lake. The drought, now in its second year, has reduced the canal\'s operational capacity by 40%. Wait times for vessel passage have increased to 10-15 days, and transit fees have risen by 30%. Shippers moving goods between Asia and the US East Coast face decisions to either wait, pay premium fees, or reroute via the Suez Canal or around South America, both adding significant time and cost. The situation is expected to persist through Q1 2026 pending adequate rainfall.',
            source: 'JOC.com',
            timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
            severity: 'high',
            category: 'Infrastructure',
        },
    ];
}
