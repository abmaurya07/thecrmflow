import { supabase } from "@/lib/utils/supabase";


// Helper function to calculate the next billing date based on plan type
const getNextBillingDate = (currentBillingDate, planName) => {
  const nextDate = new Date(currentBillingDate);

  switch (planName) {
    case 'Monthly':
      nextDate.setMonth(nextDate.getMonth() + 1);
      break;
    case 'Quarterly':
      nextDate.setMonth(nextDate.getMonth() + 3);
      break;
    case 'Half-Yearly':
      nextDate.setMonth(nextDate.getMonth() + 6);
      break;
    case 'Yearly':
      nextDate.setFullYear(nextDate.getFullYear() + 1);
      break;
    default:
      throw new Error('Unknown plan name');
  }

  return nextDate;
};

export const generateBillsForDueSubscriptions = async () => {
  try {
    const today = new Date().toISOString();
    
    // Fetch overdue subscriptions along with their plan details
    const { data: subscriptions, error } = await supabase
      .from('subscriptions')
      .select(`
        id,
        workspace_id,
        plan_id,
        total_users,
        total_fee,
        next_billing_date,
        subscription_plans(plan_name, price_per_user)
      `)
      .lte('next_billing_date', today)  // Only select subscriptions where billing is due
      .eq('status', 'ACTIVE');  // Fetch active subscriptions only

    if (error) throw error;

    if (subscriptions.length === 0) {
      console.log('No overdue subscriptions found.');
      return;
    }

    for (const subscription of subscriptions) {
      const { id: subscription_id, total_users, next_billing_date, subscription_plans } = subscription;
      const { plan_name, price_per_user } = subscription_plans[0];
      
      // Calculate the amount based on the total users and price per user
      const amount = price_per_user * total_users;

      // Insert billing into the billing history
      const periodStart = new Date(next_billing_date);
      const periodEnd = getNextBillingDate(next_billing_date, plan_name);

      const billingData = {
        subscription_id,
        period_start: periodStart,
        period_end: periodEnd,
        user_count: total_users,
        amount,
        status: 'DUE',
        created_at: new Date(),
      };

      const { data: billingHistory, error: billingError } = await supabase
        .from('billing_history')
        .insert([billingData]);

      if (billingError) throw billingError;

      console.log('Bill generated for subscription:', subscription_id, billingHistory);

      // Update the next billing date in the subscriptions table
      const updatedNextBillingDate = getNextBillingDate(next_billing_date, plan_name);

      const { error: updateError } = await supabase
        .from('subscriptions')
        .update({ next_billing_date: updatedNextBillingDate })
        .eq('id', subscription_id);

      if (updateError) throw updateError;

      console.log('Updated next billing date for subscription:', subscription_id);
    }

  } catch (error) {
    console.error('Error generating bills:', error);
  }
};
