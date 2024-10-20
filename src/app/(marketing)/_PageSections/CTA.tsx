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
              href="https://public.boxcloud.com/d/1/b1!xQFzPs_1-1VhoqK33dt_d1dWpCgqs59kCEac-5z9vu7uPd9w28TYh9qx-Wz3NPbjfvWwXls8Yn-Et7Hj8DiL84-aHL71dVHJAJYHYr9D5RVyPoZuSG8WEURN3mjcdxkR_g_kUXHr7fbE5tn0dO2vXCHcClAIH9R5Q3hyGkvQu06mrK1Jquql8OTIjNdbLwK8FOBUBzrdpvfAO1rK6YavvbOYeVSPFWLshWc_CNd4yux4AGMGHDAvX7rqgXjX86M7aGtDdDOP0tVKgkou4J8dlm6HgNJ3KgJ1doRXDKgS4IaOlt7_ieaC5UBdj2ebmNcDnnp6vLckZbQqzZ6RZCzuCwWeYeqW0GDzimMyhkb7ZpXEcnIdSPvpLWVy53_oMvHc_BS0D7X0ZLFpxRY5oLxHuwElYdXCV891y8jhvGf14fnBiJHr3lUqb0ZR_jX7y4LkgnKQQ08ljJbPCoqVWVlxWLbRt1ZokJVGcxd-pEpv6Er8ecJQFWKh2aHrmSlgEurLfsrGuiMHtUsh4kkPDTpt5jU7B4X4ggmv5MP3r2f_BnjMTRxsxDvMIPNzvTHVwdWulx6mALxDdKH_DhsBSUbOZ57VXresppV8X7tD2zuAJt0UjS3NCrlnvw5ErEBah_tFtH7tZe19BcyHQ2UpGbjzgLykbR86_PCHRNbARJGU5BrcE93NAm2TnfHrb8Mzy-bX_inLl-PbeUTmxAPSQxJeVq5NSPELeF2IB1pPmPCkCFWgNkF6EasJtjhzkwSdJJfSArwRWe1u4XqAxgyudghmMajEEuYj_-xNn2sk-LeSjezku5jdahXDV0bcDsG6wbEvv2jTaeESLosaZO8qe4fGh7rIMce3H1IlV36cfTS7zQLZcL8nqG0UkfZkD3jV6vUhhw6bmj0NEevcC43jfwfTtMa5kM2EoZVuLT9ovlGi-DMmnvnuC4xd5ot2c3uhzRIleY241JOMbBS_kYGXutzUyR20QVolM9uG4g2L2qLWDOX_LGD9ZDroa9-HNddvYVEeGW7AiyT003Pe_wMyxba14UgUJSv991AZ5iNNW7DVtzU3EiCWWVb_cf4nm6t6jiM0DJzFuXX6trGYM7K-jbaAnnL3xgUia9lKbcIDatLJKRHx-h3GEs3UHVnc_3tWzzPMljBapaZ0ASpDvcqRUrGSy8QaymLi83Sa2Yerp0uUzJNpRTltbpqp3EJlWEJfeBO5WLUkd9UlruJydI2aXUNSVqzQOV8TEOWEzlGWmtXZWPcJdRbV_GPvODRScIsPRl-5B504l0s1Lei-Q5nitxRmXQ../download" // Replace with your actual Google Drive link for Real Estate CRM APK
              className={cn(buttonVariants({ size: 'lg' }))}
              target="_blank"
              rel="noreferrer"
            >
              <HomeIcon className="w-6 h-6 mr-2" aria-hidden="true" />
              {/* You can use the icon name as the label or any appropriate text */}
              Real Estate CRM
            </Link>
            <Link
              href="https://public.boxcloud.com/d/1/b1!xQFzPs_1-1VhoqK33dt_d1dWpCgqs59kCEac-5z9vu7uPd9w28TYh9qx-Wz3NPbjfvWwXls8Yn-Et7Hj8DiL84-aHL71dVHJAJYHYr9D5RVyPoZuSG8WEURN3mjcdxkR_g_kUXHr7fbE5tn0dO2vXCHcClAIH9R5Q3hyGkvQu06mrK1Jquql8OTIjNdbLwK8FOBUBzrdpvfAO1rK6YavvbOYeVSPFWLshWc_CNd4yux4AGMGHDAvX7rqgXjX86M7aGtDdDOP0tVKgkou4J8dlm6HgNJ3KgJ1doRXDKgS4IaOlt7_ieaC5UBdj2ebmNcDnnp6vLckZbQqzZ6RZCzuCwWeYeqW0GDzimMyhkb7ZpXEcnIdSPvpLWVy53_oMvHc_BS0D7X0ZLFpxRY5oLxHuwElYdXCV891y8jhvGf14fnBiJHr3lUqb0ZR_jX7y4LkgnKQQ08ljJbPCoqVWVlxWLbRt1ZokJVGcxd-pEpv6Er8ecJQFWKh2aHrmSlgEurLfsrGuiMHtUsh4kkPDTpt5jU7B4X4ggmv5MP3r2f_BnjMTRxsxDvMIPNzvTHVwdWulx6mALxDdKH_DhsBSUbOZ57VXresppV8X7tD2zuAJt0UjS3NCrlnvw5ErEBah_tFtH7tZe19BcyHQ2UpGbjzgLykbR86_PCHRNbARJGU5BrcE93NAm2TnfHrb8Mzy-bX_inLl-PbeUTmxAPSQxJeVq5NSPELeF2IB1pPmPCkCFWgNkF6EasJtjhzkwSdJJfSArwRWe1u4XqAxgyudghmMajEEuYj_-xNn2sk-LeSjezku5jdahXDV0bcDsG6wbEvv2jTaeESLosaZO8qe4fGh7rIMce3H1IlV36cfTS7zQLZcL8nqG0UkfZkD3jV6vUhhw6bmj0NEevcC43jfwfTtMa5kM2EoZVuLT9ovlGi-DMmnvnuC4xd5ot2c3uhzRIleY241JOMbBS_kYGXutzUyR20QVolM9uG4g2L2qLWDOX_LGD9ZDroa9-HNddvYVEeGW7AiyT003Pe_wMyxba14UgUJSv991AZ5iNNW7DVtzU3EiCWWVb_cf4nm6t6jiM0DJzFuXX6trGYM7K-jbaAnnL3xgUia9lKbcIDatLJKRHx-h3GEs3UHVnc_3tWzzPMljBapaZ0ASpDvcqRUrGSy8QaymLi83Sa2Yerp0uUzJNpRTltbpqp3EJlWEJfeBO5WLUkd9UlruJydI2aXUNSVqzQOV8TEOWEzlGWmtXZWPcJdRbV_GPvODRScIsPRl-5B504l0s1Lei-Q5nitxRmXQ../download" // Replace with your actual Google Drive link for Insurance CRM APK
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
