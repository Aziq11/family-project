import { router, publicProcedure } from '../trpc';
import { z } from 'zod';

export const expenseRouter = router({
  add: publicProcedure
    .input(z.object({
      amount: z.number(),
      description: z.string(),
      category: z.string(),
      paidByUserId: z.number(),
      familyId: z.number(),
    }))
    .mutation(async ({ input, ctx }) => {
      const expense = await ctx.prisma.expense.create({
        data: {
          amount: input.amount,
          description: input.description,
          category: input.category,
          paidByUserId: input.paidByUserId,
          familyId: input.familyId,
        },
      });
      return expense;
    }),

  list: publicProcedure
    .input(z.object({ familyId: z.number() }))
    .query(async ({ input, ctx }) => {
      return await ctx.prisma.expense.findMany({
        where: { familyId: input.familyId },
        orderBy: { createdAt: 'desc' },
        include: {
          paidBy: {
            select: { name: true, id: true },
          },
        },
      });
    }),
});