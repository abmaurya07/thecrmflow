import cron from 'node-cron';
import { NextRequest, NextResponse } from 'next/server';
import { generateBillsForDueSubscriptions } from '@/lib/API/Database/generateBill/generateBill';

export async function GET(req:NextRequest) {

     // Check for the CRON_SECRET authorization
  const authHeader = req.headers.get('Authorization');
  const secret = `Bearer ${process.env.CRON_SECRET}`;
  
  if (authHeader !== secret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    // Call the function that generates bills for due subscriptions
    await generateBillsForDueSubscriptions();
    
    return NextResponse.json({ message: 'Billing process completed' });
  } catch (error) {
    console.error('Error generating bills:', error);
    return NextResponse.json({ error: 'Billing failed' }, { status: 500 });
  }
}
