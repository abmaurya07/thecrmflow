import cron from 'node-cron';
import { generateBillsForDueSubscriptions } from '@/lib/API/Database/generateBill/generateBill';

// Schedule the bill generation to run daily at midnight
cron.schedule('0 0 * * *', async () => {
  console.log('Running scheduled bill generation...');
  await generateBillsForDueSubscriptions();
});
