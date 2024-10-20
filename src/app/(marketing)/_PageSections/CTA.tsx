import { buttonVariants } from '@/components/ui/Button';
import Link from 'next/link';
import { cn } from '@/lib/utils/helpers';
import { HomeIcon } from '@radix-ui/react-icons'; // Import your app icons

export default function CTA() {
  return (
    <div className="">
      <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Boost your productivity.
            <br />
            Start using our apps today.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-slate-500">
            Elevate your business operations with our tailored CRM solutions for Real Estate and Insurance agencies. Manage leads, automate workflows, and gain insights to drive your success.
          </p>
          <div className="mt-10 space-x-4">
            {/* App Icons as Download Links */}
            <Link
              href="https://the-crm-flow-real-eastate.s3.ap-south-1.amazonaws.com/app-release.apk" // Replace with your actual Google Drive link for Real Estate CRM APK
              className={cn(buttonVariants({ size: 'lg' }))}
              target="_blank"
              rel="noreferrer"
            >
              <HomeIcon className="w-6 h-6 mr-2" aria-hidden="true" />
              {/* You can use the icon name as the label or any appropriate text */}
              Real Estate CRM
            </Link>
            <Link
              href="https://the-crm-flow-real-eastate.s3.ap-south-1.amazonaws.com/app-release.apk" // Replace with your actual Google Drive link for Insurance CRM APK
              className={cn(buttonVariants({ size: 'lg' }))}
              target="_blank"
              rel="noreferrer"
            >
              <HomeIcon className="w-6 h-6 mr-2" aria-hidden="true" />
              Insurance CRM
            </Link>
            <Link href="/pricing" className={cn(buttonVariants({ size: 'lg' }))}>
              See Pricing
            </Link>
            <Link
              href="/faq"
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: 'ghost', size: 'lg' }))}
            >
              Learn More <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
