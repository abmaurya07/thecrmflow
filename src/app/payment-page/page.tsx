'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Script from 'next/script';

export default function PaymentPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const [error, setError] = useState(null);
  const searchParams = useSearchParams();
  const [customerDetails, setCustomerDetails] = useState<any>(null);
  const [amount, setAmount] = useState<any>(null)

  const isCashfreeReady = () => {
    return typeof window !== 'undefined' && 'Cashfree' in window;
  };

  useEffect(() => {
    const userId = searchParams.get('user_id');
    const customerEmail = searchParams.get('email');
    const customerPhone = searchParams.get('phone');
    const subscriptionAmount = searchParams.get('amount');


    if (!userId || !customerEmail || !customerPhone) return;

    const data = {
      id: userId,
      customerEmail,
      customerPhone,
    }

    setCustomerDetails(data)
    setAmount(subscriptionAmount)
    
   

  }, [searchParams]);

  useEffect(() => {
    const checkSDKStatus = () => {
      if (isCashfreeReady()) {
        setSdkLoaded(true);
        console.log('Cashfree SDK detected in window object');
      }
    };

    checkSDKStatus();
    const timer = setTimeout(checkSDKStatus, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handlePayment = async () => {
    try {
      setError(null);
      if (!isCashfreeReady()) {
        throw new Error('Cashfree SDK not loaded');
      }

      setLoading(true);

      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount,
          customerDetails,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Payment initiation failed');
      }

      console.log('Payment session created:', data);

      const paymentConfig = {
        paymentSessionId: data.paymentSessionId,
        returnUrl: `${window.location.origin}/payment-status?order_id=${data.orderId}`,
      };

      try {
        const cashfree = new (window as any).Cashfree({
          mode: "production",
        });
        console.log('Cashfree instance created:', cashfree);

        cashfree.checkout(paymentConfig).then(function(result) {
          if (result.error) {
            alert(result.error.message);
          }
          if (result.redirect) {
            console.log("Redirection");
          }
        });

      } catch (paymentError) {
        throw new Error('Failed to initiate payment');
      }

      setLoading(false);
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Payment initiation failed';
      setError(errorMessage);
      setLoading(false);
    }
  };

  return (
    <>
      <Script
        id="cashfree-sdk"
        src="https://sdk.cashfree.com/js/v3/cashfree.js"
        strategy="beforeInteractive"
        onLoad={() => setSdkLoaded(true)}
        onError={(e) => setError('Failed to load payment system')}
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 sm:p-6 md:p-8">
        <div className="max-w-md mx-auto">
          {/* Card Container */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all hover:shadow-xl">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8 text-white">
              <h1 className="text-2xl md:text-3xl font-bold text-center">
                Complete Your Payment
              </h1>
              <div className="mt-2 text-center text-blue-100 text-sm">
                Secure Payment Gateway
              </div>
            </div>

            {/* Main Content */}
            <div className="p-6">
              {/* Amount Display */}
              <div className="mb-8 text-center">
                <span className="text-gray-500 text-sm">Amount to Pay</span>
                <div className="text-3xl font-bold text-gray-800 mt-1">{amount}</div>
              </div>

              {/* User Info Card */}
              <div className="bg-blue-50 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-blue-800 font-medium">Payment Details</span>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    Secure
                  </span>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>{searchParams.get('user_name')}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>{customerDetails.customerEmail || ''}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>{customerDetails.customerPhone || ''}</span>
                  </div>
                </div>
              </div>

              {/* Status Messages */}
              {!sdkLoaded && (
                <div className="flex items-center justify-center space-x-2 text-yellow-600 mb-4">
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Loading payment system...</span>
                </div>
              )}

              {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{error}</span>
                </div>
              )}

              {/* Payment Button */}
              <button
                onClick={handlePayment}
                disabled={loading || !sdkLoaded}
                className={`w-full py-4 rounded-xl text-white font-semibold text-lg transition-all duration-200 transform
                  ${loading || !sdkLoaded 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 hover:shadow-lg active:scale-98'
                  }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Processing...</span>
                  </div>
                ) : (
                  'Pay Now'
                )}
              </button>

              {/* Security Badge */}
              <div className="mt-6 flex items-center justify-center text-gray-500 text-sm">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Secured by Cashfree Payments</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}