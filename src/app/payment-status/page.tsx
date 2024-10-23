'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function PaymentStatusPage() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'failed'>('loading');
  const [orderDetails, setOrderDetails] = useState<any>(null);

  useEffect(() => {
    const orderId = searchParams.get('order_id');
    if (!orderId) return;

    const checkPaymentStatus = async () => {
      try {
        const response = await fetch(`/api/payment-status?order_id=${orderId}`);
        const data = await response.json();

        if (!response.ok) throw new Error(data.error || 'Status check failed');

        setOrderDetails(data);
        setStatus(data.order_status === 'PAID' ? 'success' : 'failed');
      } catch (error) {
        console.error('Status check error:', error);
        setStatus('failed');
      }
    };

    checkPaymentStatus();
  }, [searchParams]);

  const getStatusIcon = () => {
    switch (status) {
      case 'loading':
        return (
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600"></div>
        );
      case 'success':
        return (
          <div className="animate-scale-in">
            <div className="rounded-full bg-green-100 p-4">
              <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
        );
      case 'failed':
        return (
          <div className="animate-scale-in">
            <div className="rounded-full bg-red-100 p-4">
              <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <div className="max-w-md mx-auto pt-12">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8 text-white text-center">
            <h1 className="text-2xl font-bold">Payment Status</h1>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Status Icon */}
            <div className="flex justify-center mb-6">
              {getStatusIcon()}
            </div>

            {/* Status Message */}
            <div className="text-center mb-8">
              {status === 'loading' && (
                <div className="animate-pulse">
                  <p className="text-lg text-gray-600 font-medium">Verifying Payment</p>
                  <p className="text-sm text-gray-500 mt-2">Please wait while we confirm your payment...</p>
                </div>
              )}

              {status === 'success' && (
                <div className="animate-fade-in">
                  <p className="text-xl text-green-600 font-semibold mb-2">Payment Successful!</p>
                  <p className="text-gray-600">Thank you for your payment</p>
                </div>
              )}

              {status === 'failed' && (
                <div className="animate-fade-in">
                  <p className="text-xl text-red-600 font-semibold mb-2">Payment Failed</p>
                  <p className="text-gray-600">We couldn&apos;t process your payment</p>
                </div>
              )}
            </div>

            {/* Order Details */}
            {orderDetails && status === 'success' && (
              <div className="bg-gray-50 rounded-xl p-4 space-y-3 animate-fade-in">
                <h2 className="text-gray-700 font-medium">Order Details</h2>
                
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">Order ID</span>
                  <span className="text-gray-800 font-medium">{orderDetails.order_id}</span>
                </div>
                
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Amount Paid</span>
                  <span className="text-gray-800 font-medium">₹{orderDetails.order_amount.toLocaleString()}</span>
                </div>

                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Payment Date</span>
                  <span className="text-gray-800 font-medium">
                    {new Date().toLocaleDateString()}
                  </span>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-8 space-y-3">
              {status === 'success' && (
                <button 
                  onClick={() => window.print()}
                  className="w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors flex items-center justify-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  <span>Print Receipt</span>
                </button>
              )}
              
              <button 
                onClick={() => window.close()}
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors"
              >
                Return to Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}