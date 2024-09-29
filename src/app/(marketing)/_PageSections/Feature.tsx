import { Lock, CloudIcon } from 'lucide-react';
import Image from 'next/image';

const features = [
  {
    name: 'Lead Management',
    description:
      'Streamline your sales process with our comprehensive lead management system. Capture, track, and nurture leads effectively to boost conversions and optimize your sales funnel.',
    icon: CloudIcon
  },
  {
    name: 'Automated Calling Flow',
    description:
      'Enhance communication with automated calling flows designed for your agents. Schedule calls, automate follow-ups, and ensure no lead falls through the cracks.',
    icon: Lock
  },
  {
    name: 'Performance Analytics',
    description:
      'Gain valuable insights into your sales performance with our detailed analytics tools. Visualize key metrics, agent performance, and lead engagement to make informed decisions.',
    icon: CloudIcon
  },
  {
    name: 'Site Visit Management',
    description:
      'Manage site visits effortlessly. Schedule visits, track attendance, and gather feedback to improve client interactions and satisfaction.',
    icon: Lock
  },
  {
    name: 'Lead Assignment',
    description:
      'Efficiently assign leads to agents based on various criteria to maximize efficiency and ensure timely follow-ups. Monitor assignments to ensure optimal lead handling.',
    icon: CloudIcon
  },
  {
    name: 'Custom CRM Solution',
    description:
      'Tailor our CRM platform to meet your unique business needs. Our team will work with you to develop a customized solution that fits your workflow perfectly.',
    icon: Lock
  }
];

interface FeaturePropsI {
  isFlipped?: boolean;
  sliceFrom?: number;
  sliceTo?: number;
}

const FeatureText = ({ isFlipped, sliceFrom, sliceTo }: FeaturePropsI) => {
  return (
    <div className={`px-6 lg:px-0 lg:pr-4 lg:pt-4 ${isFlipped && 'lg:ml-8 order-2'}`}>
      <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-lg">
        
        <div className="mt-10 max-w-xl space-y-8 text-base leading-7 text-slate-600 lg:max-w-none">
          {features.slice(sliceFrom, sliceTo).map((feature) => (
            <div key={feature.name} className="">
              <div className="flex items-center">
                <feature.icon className="mr-2 mb-1" size={24} />
                <span className="font-semibold text-lg">{feature.name}</span>
              </div>
              <div className="text-slate-400 text-base font-medium">{feature.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const FeatureImage = () => {
  return (
    <div className="hidden lg:block self-center">
      <Image
        src="https://tailwindui.com/img/component-images/project-app-screenshot.png"
        alt="Product screenshot"
        width={3840}
        height={75}
      />
    </div>
  );
};

export default function Feature({ isFlipped, sliceFrom, sliceTo }: FeaturePropsI) {
  return (
    <div className="mt-24">
      <div className="mx-auto max-w-7xl md:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:grid-cols-2 lg:items-start">
          <FeatureText sliceFrom={sliceFrom} sliceTo={sliceTo} isFlipped={isFlipped} />
          <FeatureImage />
        </div>
      </div>
    </div>
  );
}
