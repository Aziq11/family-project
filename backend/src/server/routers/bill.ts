import { router, publicProcedure } from '../trpc';
import { z } from 'zod';

export const billRouter = router({
  add: publicProcedure
    .input(z.object({
      name: z.string(),
      amount: z.number(),
      dueDay: z.number().min(1).max(31),
      category: z.string(),
      familyId: z.number(),
      defaultPayerId: z.number().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      const bill = await ctx.prisma.bill.create({
        data: {
          name: input.name,
          amount: input.amount,
          dueDay: input.dueDay,
          category: input.category,
          familyId: input.familyId,
          defaultPayerId: input.defaultPayerId,
        },
      });
      return bill;
    }),

  getUpcoming: publicProcedure
    .input(z.object({ familyId: z.number() }))
    .query(async ({ input, ctx }) => {
      const currentDay = new Date().getDate();
      
      const bills = await ctx.prisma.bill.findMany({
        where: {
          familyId: input.familyId,
          isActive: true,
        },
      });
      
      // Filter bills due in next 7 days
      const upcoming = bills.filter(bill => {
        const dueDay = bill.dueDay;
        if (dueDay >= currentDay && dueDay <= currentDay + 7) return true;
        if (dueDay <= (currentDay + 7 - 31)) return true;
        return false;
      });
      
      return upcoming;
    }),
});