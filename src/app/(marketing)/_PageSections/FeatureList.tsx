import { CloudCog, Users, PhoneCall, BarChart, Calendar, CheckCircle } from 'lucide-react';

interface FeatureCardI {
  heading: string;
  description: string;
  icon: React.ReactNode;
}

const FeatureCard = ({ heading, description, icon }: FeatureCardI) => {
  return (
    <div className="rounded-lg border bg-background-light dark:bg-background-dark p-2">
      <div className="flex h-[180px] flex-col justify-between p-6">
        <div className="space-y-2">
          {icon}
          <h3 className="font-bold">{heading}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default async function FeatureList() {
  return (
    <section className="space-y-6 py-8 mx-4">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h2 className="text-3xl leading-4 md:text-6xl">Features of The CRM Flow</h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground text-lg">
          The CRM Flow is designed to empower small and medium-sized enterprises with tailored CRM solutions.
        </p>
      </div>
      <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
        <FeatureCard
          heading={'Lead Management'}
          description={'Efficiently manage and track all your leads in one place.'}
          icon={<Users size={32} />}
        />
        <FeatureCard
          heading={'Automated Calling Flow'}
          description={'Streamline communication with automated call workflows for agents.'}
          icon={<PhoneCall size={32} />}
        />
        <FeatureCard
          heading={'Performance Analytics'}
          description={'Visualize agent performance and call effectiveness with insightful data.'}
          icon={<BarChart size={32} />}
        />
        <FeatureCard
          heading={'Site Visit Management'}
          description={'Schedule and manage site visits seamlessly.'}
          icon={<Calendar size={32} />}
        />
        <FeatureCard
          heading={'Lead Assignments'}
          description={'Automatically assign leads to agents based on predefined rules.'}
          icon={<CloudCog size={32} />}
        />
        <FeatureCard
          heading={'Custom CRM Solutions'}
          description={'Tailored CRM development to meet unique business needs.'}
          icon={<CheckCircle size={32} />}
        />
      </div>
      <div className="mx-auto text-center md:max-w-[58rem]">
        <p className="leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Our platform is adaptable and designed to evolve with your business requirements, offering comprehensive support for various industries.
        </p>
      </div>
    </section>
  );
}
