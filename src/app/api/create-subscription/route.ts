import { NextApiRequest, NextApiResponse } from 'next';
import Razorpay from 'razorpay';

interface RazorpaySubscriptionResponse {
  id: string;
}

interface RazorpayCustomerResponse {
  id: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    console.log('req', req.method);
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, planId } = req.body;

  if (!email || !planId) {
    return res.status(400).json({ message: 'Email and Plan ID are required' });
  }

  try {
    console.log('keys', process.env.RAZORPAY_KEY_ID, process.env.RAZORPAY_KEY_SECRET);
    // Initialize Razorpay instance
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID as string,
      key_secret: process.env.RAZORPAY_KEY_SECRET as string,
    });

    // Create a customer for the subscription
    const customer: RazorpayCustomerResponse = await razorpay.customers.create({
      name: email,
      email: email,
    });

    // Create a subscription for the customer
    const subscription: RazorpaySubscriptionResponse = await razorpay.subscriptions.create({
      plan_id: planId,
      customer_notify: 1,
      total_count: 12, // Example: 12 billing cycles (e.g., months)
    });

    // Send back the subscription details
    res.status(200).json({
      subscriptionId: subscription.id,
      customerId: customer.id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
