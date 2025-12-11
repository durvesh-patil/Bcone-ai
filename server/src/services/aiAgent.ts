import { Mistral } from '@mistralai/mistralai';
import { z } from 'zod';

// Lazy initialization of Mistral AI client
let mistral: Mistral | null = null;
function getMistralClient() {
    if (!mistral && process.env.MISTRAL_API_KEY) {
        mistral = new Mistral({ apiKey: process.env.MISTRAL_API_KEY });
    }
    return mistral;
}

// Schema for AI response
const NewsAnalysisSchema = z.object({
    isRelevant: z.boolean(),
    severity: z.enum(['low', 'medium', 'high', 'critical']),
    affectedLocations: z.array(z.string()),
    affectedModes: z.array(z.enum(['sea', 'air', 'rail', 'truck'])),
    impactDuration: z.string(),
    costImpact: z.number(), // Percentage increase
    timeImpact: z.number(), // Hours delay
    summary: z.string(),
    recommendations: z.array(z.string()),
});

export type NewsAnalysis = z.infer<typeof NewsAnalysisSchema>;

interface AnalyzeNewsInput {
    newsTitle: string;
    newsContent: string;
    routeOrigin: string;
    routeDestination: string;
    currentMode: string;
}

export async function analyzeNewsEvent(
    input: AnalyzeNewsInput
): Promise<NewsAnalysis> {
    const { newsTitle, newsContent, routeOrigin, routeDestination, currentMode } =
        input;

    console.log('\n🔍 [SERVER] Analyzing news event with Mistral AI...');
    console.log('News:', newsTitle);
    console.log('Route:', routeOrigin, '→', routeDestination);
    console.log('Mode:', currentMode);

    // Get Mistral client (lazy initialization)
    const client = getMistralClient();

    // If no Mistral key, return mock analysis
    if (!client) {
        console.warn('⚠️  No Mistral API key found, using mock analysis');
        const mockResult = getMockAnalysis(newsTitle, currentMode);
        console.log('📦 [SERVER] Mock Analysis Result:', JSON.stringify(mockResult, null, 2));
        return mockResult;
    }

    try {
        const prompt = `You are a supply chain risk analyst. Analyze this news event and determine its impact on the given shipping route.

NEWS EVENT:
Title: ${newsTitle}
Content: ${newsContent}

ROUTE DETAILS:
Origin: ${routeOrigin}
Destination: ${routeDestination}
Current Transport Mode: ${currentMode}

Analyze and provide:
1. Is this news relevant to the given route? (true/false)
2. Severity: low, medium, high, or critical
3. Affected locations (cities, ports, regions, countries)
4. Affected transport modes (sea, air, rail, truck)
5. Expected impact duration (e.g., "2 weeks", "3 months")
6. Cost impact as percentage increase (e.g., 15 means 15% higher cost)
7. Time impact in hours of additional delay
8. Brief summary (2-3 sentences)
9. Recommended actions (list of 2-3 specific actions)

Respond ONLY with valid JSON matching this exact structure:
{
  "isRelevant": boolean,
  "severity": "low" | "medium" | "high" | "critical",
  "affectedLocations": string[],
  "affectedModes": string[],
  "impactDuration": string,
  "costImpact": number,
  "timeImpact": number,
  "summary": string,
  "recommendations": string[]
}`;

        const chatResponse = await client.chat.complete({
            model: 'mistral-large-latest',
            messages: [
                {
                    role: 'system',
                    content:
                        'You are an expert supply chain risk analyst. Provide accurate, actionable analysis in JSON format only. Do not include any text outside the JSON object.',
                },
                { role: 'user', content: prompt },
            ],
            temperature: 0.3,
            responseFormat: { type: 'json_object' },
        });

        const responseText = chatResponse.choices?.[0]?.message?.content;
        if (!responseText || typeof responseText !== 'string') {
            throw new Error('Empty or invalid response from Mistral AI');
        }

        console.log('\n🤖 [SERVER] Raw Mistral AI Response:');
        console.log(responseText);

        const parsed = JSON.parse(responseText);
        const validated = NewsAnalysisSchema.parse(parsed);

        console.log('\n✅ [SERVER] Validated Analysis Result:');
        console.log(JSON.stringify(validated, null, 2));
        console.log('======================================\n');

        return validated;
    } catch (error) {
        console.error('Error analyzing news with Mistral AI:', error);
        // Fallback to mock analysis
        return getMockAnalysis(newsTitle, currentMode);
    }
}

// Mock analysis for demo/testing
function getMockAnalysis(newsTitle: string, currentMode: string): NewsAnalysis {
    const titleLower = newsTitle.toLowerCase();

    if (titleLower.includes('red sea') || titleLower.includes('houthi')) {
        return {
            isRelevant: true,
            severity: 'critical',
            affectedLocations: ['Red Sea', 'Suez Canal', 'Gulf of Aden', 'Yemen'],
            affectedModes: ['sea'],
            impactDuration: '3-6 months',
            costImpact: 25,
            timeImpact: 240, // 10 days
            summary:
                'Houthi attacks in Red Sea have forced major shipping lines to reroute via Cape of Good Hope, adding significant time and cost. This affects all Asia-Europe sea routes through Suez Canal.',
            recommendations: [
                'Reroute via Cape of Good Hope (adds 10 days, $50K cost)',
                'Consider air freight for time-sensitive cargo',
                'Delay non-urgent shipments until situation stabilizes',
            ],
        };
    }

    if (titleLower.includes('port strike') || titleLower.includes('hamburg')) {
        return {
            isRelevant: true,
            severity: 'high',
            affectedLocations: ['Hamburg', 'Germany', 'Northern Europe'],
            affectedModes: ['sea', 'truck'],
            impactDuration: '2 weeks',
            costImpact: 15,
            timeImpact: 48,
            summary:
                'Port workers strike at Hamburg disrupts container operations. Expect delays for vessels and increased truck congestion at alternative ports.',
            recommendations: [
                'Divert to Rotterdam or Antwerp ports',
                'Arrange pre-clearance to expedite customs',
                'Coordinate with trucking partners for last-mile delivery',
            ],
        };
    }

    if (titleLower.includes('tariff') || titleLower.includes('china')) {
        return {
            isRelevant: true,
            severity: 'high',
            affectedLocations: ['China', 'United States', 'All US ports'],
            affectedModes: ['sea', 'air'],
            impactDuration: 'Indefinite (policy change)',
            costImpact: 20,
            timeImpact: 0,
            summary:
                'New 25% tariff on Chinese electronics increases landed cost significantly. Does not affect transit time but requires duty engineering and potential sourcing changes.',
            recommendations: [
                'Expedite shipments before tariff effective date',
                'Explore Vietnam or Mexico sourcing alternatives',
                'Review product classification for duty optimization',
            ],
        };
    }

    if (titleLower.includes('typhoon') || titleLower.includes('singapore')) {
        return {
            isRelevant: true,
            severity: 'medium',
            affectedLocations: ['Singapore', 'Southeast Asia', 'Malacca Strait'],
            affectedModes: ['sea', 'air'],
            impactDuration: '3-5 days',
            costImpact: 5,
            timeImpact: 72,
            summary:
                'Typhoon approaching Singapore may cause port closures and flight cancellations. Temporary disruption expected, situation will normalize within a week.',
            recommendations: [
                'Monitor weather updates closely',
                'Prepare for 3-5 day delay in Singapore port',
                'Consider routing via Hong Kong if urgent',
            ],
        };
    }

    // Default low-risk analysis
    return {
        isRelevant: false,
        severity: 'low',
        affectedLocations: [],
        affectedModes: [],
        impactDuration: 'N/A',
        costImpact: 0,
        timeImpact: 0,
        summary: 'This news event does not significantly impact the given route.',
        recommendations: ['Continue monitoring situation', 'No immediate action required'],
    };
}
