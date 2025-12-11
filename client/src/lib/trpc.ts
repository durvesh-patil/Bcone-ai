import { createTRPCReact } from '@trpc/react-query';

// Type-safe client without importing server types
export const trpc = createTRPCReact<any>();
