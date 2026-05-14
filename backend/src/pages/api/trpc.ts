import { createNextApiHandler } from '@trpc/server/adapters/next';
import { appRouter } from '../../server/routers';
import { createTRPCContext } from '../../server/trpc';

export default createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
});
