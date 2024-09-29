'use client';

import config from '@/lib/config/marketing';
import Link from 'next/link';
import { SocialIcons } from './Icons';
import configuration from '@/lib/config/site';
import { Input } from './ui/Input';
import { Button } from './ui/Button';

export default function Footer() {
  const { footer_nav } = config;

  return (
    <footer className="bg-slate-800 mt-8">
      <div className="mx-auto max-w-7xl px-6 pb-6 pt-16 lg:px-8 ">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="grid grid-cols-2 gap-8 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">
                  About Us
                </h3>
                <ul role="list" className="mt-4 space-y-4">
                  <li>
                    <Link
                      href="/about"
                      className="text-sm leading-6 text-gray-300 hover:text-white"
                    >
                      Our Story
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/team"
                      className="text-sm leading-6 text-gray-300 hover:text-white"
                    >
                      Meet the Team
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/careers"
                      className="text-sm leading-6 text-gray-300 hover:text-white"
                    >
                      Careers
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">
                  Resources
                </h3>
                <ul role="list" className="mt-4 space-y-4">
                  <li>
                    <Link
                      href="/blog"
                      className="text-sm leading-6 text-gray-300 hover:text-white"
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/faq"
                      className="text-sm leading-6 text-gray-300 hover:text-white"
                    >
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/support"
                      className="text-sm leading-6 text-gray-300 hover:text-white"
                    >
                      Support
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">
                  Legal
                </h3>
                <ul role="list" className="mt-4 space-y-4">
                  <li>
                    <Link
                      href="/privacy-policy"
                      className="text-sm leading-6 text-gray-300 hover:text-white"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/terms-and-conditions"
                      className="text-sm leading-6 text-gray-300 hover:text-white"
                    >
                      Terms of Service
                    </Link>

                  </li>

                  <li>
                    <Link
                      href="/contact-us"
                      className="text-sm leading-6 text-gray-300 hover:text-white"
                    >
                      Contact us
                    </Link>
                    
                  </li>
                  <li>
                    <Link
                      href="/cancellation-and-refund"
                      className="text-sm leading-6 text-gray-300 hover:text-white"
                    >
                      Cancellation & Refund
                    </Link>
                    
                  </li>

                </ul>
              </div>
            </div>
          </div>
          <div className="mt-8 xl:mt-0">
            <h3 className="text-sm font-semibold leading-6 text-white">
              Stay Updated
            </h3>
            <p className="mt-2 text-sm leading-6 text-gray-300">
              Subscribe to our newsletter for the latest updates, articles, and resources tailored for small and medium-sized enterprises.
            </p>
            <div className="mt-6 sm:flex sm:max-w-md">
              <Input
                type="email"
                name="email-address"
                autoComplete="email"
                placeholder="Enter your email"
              />
              <div className="mt-4 sm:ml-4 sm:mt-0 sm:flex-shrink-0">
                <Button variant="secondary" type="submit">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 ">
          <p className="text-xs leading-5 text-slate-300 py-4 text-center md:text-left">
            &copy; 2024 The CRM Flow. All rights reserved.
          </p>
          {/* <div className="text-white py-4 justify-self-center">
            <div className="flex items-end">
              <Link href={configuration.links.twitter} target="_blank" rel="noopener noreferrer">
                <SocialIcons.Twitter className="mx-8" size={24} />
              </Link>
              <Link href={configuration.links.github} target="_blank" rel="noopener noreferrer">
                <SocialIcons.Github className="mx-8" size={24} />
              </Link>
              <Link href={configuration.links.linkedin} target="_blank" rel="noopener noreferrer">
                <SocialIcons.Linkedin className="mx-8" size={24} />
              </Link>
            </div>
          </div> */}
        </div>
      </div>
    </footer>
  );
}
