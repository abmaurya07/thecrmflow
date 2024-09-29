import { Icons } from '@/components/Icons';
import { IntervalE } from '../types/enums';

const configuration = {
  routes: [
    { title: 'Overview', link: '/dashboard/main', icon: Icons.Home },
    { title: 'Todos', link: '/dashboard/todos/create', icon: Icons.Laptop },
    { title: 'Settings', link: '/dashboard/settings/profile', icon: Icons.Settings }
  ],
  subroutes: {
    todos: [
      { title: 'Create', link: '/dashboard/todos/create' },
      { title: 'My Todos', link: '/dashboard/todos/my-todos' },
      { title: 'All Todos', link: '/dashboard/todos/list-todos' }
    ],
    settings: [
      { title: 'Profile', link: '/dashboard/settings/profile' },
      { title: 'Billing', link: '/dashboard/settings/billing' },
      { title: 'Subscription', link: '/dashboard/settings/subscription' }
    ]
  },
  products: [
    {
      name: 'Basic Real Estate CRM',
      description: 'Ideal for small real estate teams and solo agents',
      features: [
        'Lead Management',
        '10 Agents Included',
        'Automated Call Tracking',
        'Basic Reporting',
        'Limited Site Visit Scheduling',
        'Email Support'
      ],
      plans: [
        {
          name: 'Basic Monthly',
          interval: IntervalE.MONTHLY,
          price: '500',
          price_id: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_BASIC_MONTHLY_REAL_ESTATE,
          isPopular: true
        },
        {
          name: 'Basic Annual',
          interval: IntervalE.YEARLY,
          price: '5000',
          price_id: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_BASIC_YEARLY_REAL_ESTATE,
          isPopular: false
        }
      ]
    },
    {
      name: 'Pro Real Estate CRM',
      description: 'Perfect for larger real estate agencies looking for advanced features',
      features: [
        'Lead Management',
        'Unlimited Agents',
        'Automated Call Tracking',
        'Advanced Reporting & Analytics',
        'Unlimited Site Visit Scheduling',
        'Priority Support',
        'Customizable Dashboards'
      ],
      plans: [
        {
          name: 'Pro Monthly',
          interval: IntervalE.MONTHLY,
          price: '1000',
          price_id: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PREMIUM_MONTHLY_REAL_ESTATE,
          isPopular: false
        },
        {
          name: 'Pro Annual',
          interval: IntervalE.YEARLY,
          price: '10000',
          price_id: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PREMIUM_YEARLY_REAL_ESTATE,
          isPopular: false
        }
      ]
    }
  ]
  
};

export default configuration;
