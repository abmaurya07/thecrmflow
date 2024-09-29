import { cn } from '@/lib/utils/helpers';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/Button';
import Image from 'next/image';

const HeroScreenshot = () => {
  return (
    <div className="hidden lg:grid items-center justify-center mt-16 mx-8">
      <Image
        src="https://tailwindui.com/img/component-images/dark-project-app-screenshot.png" // Replace with your actual app screenshot URL
        alt="CRM app screenshot"
        className="mx-auto h-[90%] lg:max-lg:w-[90%] 2xl:max-w-[72rem]"
        width={3840}
        height={75}
      />
    </div>
  );
};

export default function Hero() {
  return (
    <div>
      <section className="py-8 px-4">
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-3xl md:text-7xl md:max-w-[54rem]">
            Transforming Business Management with Tailored CRM Solutions
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            At The CRM Flow, we specialize in providing innovative CRM platforms for Real Estate and Insurance agencies, empowering your team to manage leads, automate workflows, and enhance productivity. Explore our solutions designed to meet the unique needs of SMEs.
          </p>
          <div className="space-x-4">
            <Link href="/login" className={cn(buttonVariants({ size: 'lg' }))}>
              Get Started
            </Link>
            <Link
              href="/"
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: 'ghost', size: 'lg' }))}
            >
              Learn More <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
