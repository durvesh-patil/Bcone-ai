import { createTRPCReact } from '@trpc/react-query';

// Define minimal router type for frontend-only deployment
type AppRouter = {
    optimizeRoute: any;
    analyzeNews: any;
    getNewsEvents: any;
};

export const trpc = createTRPCReact<AppRouter>();
