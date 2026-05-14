import { router, publicProcedure } from '../trpc';
import { z } from 'zod';
import bcrypt from 'bcryptjs';

export const authRouter = router({
  ping: publicProcedure.query(() => ({
    success: true,
    message: 'auth router reachable',
  })),

  register: publicProcedure
    .input(z.object({
      email: z.string().email(),
      password: z.string().min(6),
      name: z.string(),
      familyName: z.string(),
    }))
    .mutation(async ({ input, ctx }) => {
      const hashedPassword = await bcrypt.hash(input.password, 10);
      const inviteCode = Math.random().toString(36).substring(2, 10).toUpperCase();
      
      // Create family
      const family = await ctx.prisma.family.create({
        data: {
          name: input.familyName,
          inviteCode,
        },
      });
      
      // Create user
      const user = await ctx.prisma.user.create({
        data: {
          email: input.email,
          password: hashedPassword,
          name: input.name,
          familyId: family.id,
        },
      });
      
      return { success: true, userId: user.id, inviteCode };
    }),

  login: publicProcedure
    .input(z.object({
      email: z.string(),
      password: z.string(),
    }))
    .mutation(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.findUnique({
        where: { email: input.email },
      });
      
      if (!user) throw new Error('User not found');
      
      const valid = await bcrypt.compare(input.password, user.password);
      if (!valid) throw new Error('Invalid password');
      
      return { 
        success: true, 
        user: { 
          id: user.id, 
          email: user.email, 
          name: user.name, 
          familyId: user.familyId 
        } 
      };
    }),
});