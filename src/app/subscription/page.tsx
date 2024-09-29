'use client'
import { useState, FormEvent } from 'react';
import axios from 'axios';

interface SubscriptionResponse {
  subscriptionId: string;
  customerId: string;
}

export default function SubscriptionPage() {
  const [email, setEmail] = useState<string>('');
  const [planId, setPlanId] = useState<string>(''); // Valid Razorpay plan ID
  const [loading, setLoading] = useState<boolean>(false);
  const [subscriptionData, setSubscriptionData] = useState<SubscriptionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubscription = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post<SubscriptionResponse>('/api/create-subscription', {
        email,
        planId,
      });

      setSubscriptionData(response.data);
    } catch (error) {
      setError('Failed to create subscription');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Create a Subscription Plan</h1>
      <form onSubmit={handleSubscription}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Plan ID:
          <input
            type="text"
            value={planId}
            onChange={(e) => setPlanId(e.target.value)}
            required
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Subscription'}
        </button>
      </form>

      {subscriptionData && (
        <div>
          <h2>Subscription Created Successfully</h2>
          <p>Subscription ID: {subscriptionData.subscriptionId}</p>
          <p>Customer ID: {subscriptionData.customerId}</p>
        </div>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
