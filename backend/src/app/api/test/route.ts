import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const userCount = await prisma.user.count();
    
    return NextResponse.json({ 
      success: true, 
      message: 'Database connected!',
      stats: { 
        users: userCount
      }
    });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ 
      success: false, 
      error: String(error) 
    }, { status: 500 });
  }
}
