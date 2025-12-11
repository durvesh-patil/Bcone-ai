import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import { optimizeRoute } from '../services/routeOptimizer.js';
import { analyzeNewsEvent } from '../services/aiAgent.js';
import { getMockNewsEvents } from '../data/mockNews.js';

const t = initTRPC.create();

export const appRouter = t.router({
    // Get optimized routes
    optimizeRoute: t.procedure
        .input(
            z.object({
                origin: z.string(),
                destination: z.string(),
                priority: z.enum(['cost', 'time', 'balanced']),
                weight: z.number().optional(),
                deadline: z.string().optional(),
            })
        )
        .query(async ({ input }) => {
            return optimizeRoute(input);
        }),

    // Get mock news events for simulation
    getNewsEvents: t.procedure.query(async () => {
        return getMockNewsEvents();
    }),

    // Analyze news event with AI
    analyzeNews: t.procedure
        .input(
            z.object({
                newsTitle: z.string(),
                newsContent: z.string(),
                routeOrigin: z.string(),
                routeDestination: z.string(),
                currentMode: z.string(),
            })
        )
        .mutation(async ({ input }) => {
            return analyzeNewsEvent(input);
        }),

    // Simulate disruption and get alternative routes
    simulateDisruption: t.procedure
        .input(
            z.object({
                eventId: z.string(),
                affectedRoutes: z.array(
                    z.object({
                        origin: z.string(),
                        destination: z.string(),
                        priority: z.enum(['cost', 'time', 'balanced']),
                    })
                ),
            })
        )
        .mutation(async ({ input }) => {
            const newsEvents = getMockNewsEvents();
            const event = newsEvents.find((e) => e.id === input.eventId);

            if (!event) {
                throw new Error('Event not found');
            }

            // Get alternative routes for all affected routes
            const alternatives = await Promise.all(
                input.affectedRoutes.map(async (route) => {
                    const analysis = await analyzeNewsEvent({
                        newsTitle: event.title,
                        newsContent: event.content,
                        routeOrigin: route.origin,
                        routeDestination: route.destination,
                        currentMode: 'sea', // Assume sea is affected
                    });

                    const alternativeRoute = await optimizeRoute({
                        ...route,
                        // Adjust priority based on risk
                        priority: analysis.severity === 'critical' ? 'time' : route.priority,
                    });

                    return {
                        route,
                        analysis,
                        alternatives: alternativeRoute.routes,
                    };
                })
            );

            return {
                event,
                impact: alternatives,
            };
        }),
});

export type AppRouter = typeof appRouter;
