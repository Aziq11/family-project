import { router } from '../trpc';
import { authRouter } from './auth';
import { expenseRouter } from './expense';
import { billRouter } from './bill';

export const appRouter = router({
  auth: authRouter,
  expense: expenseRouter,
  bill: billRouter,
});

export type AppRouter = typeof appRouter;