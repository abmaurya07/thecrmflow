import type { NextApiRequest, NextApiResponse } from 'next';

// Verification function to handle the webhook verification process
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // When Meta sends a GET request to verify the webhook, respond with the challenge token
    const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN;
    const hubToken = req.query['hub.verify_token'];
    const hubChallenge = req.query['hub.challenge'];

    if (hubToken === verifyToken) {
      return res.status(200).send(hubChallenge);
    } else {
      return res.status(403).json({ message: 'Forbidden - Invalid Verify Token' });
    }
  }

  // Handle the webhook POST request (the same as the previous version)
  if (req.method === 'POST') {
    const message = req.body;
    // Process the incoming WhatsApp message here...
    return res.status(200).json({ status: 'success' });
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}
