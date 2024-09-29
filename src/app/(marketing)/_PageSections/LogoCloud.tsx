import { Box, Anchor, Bird, Carrot, Citrus, Factory, User, Shield, Building, Briefcase, Calendar } from 'lucide-react';


export default function LogoCloud() {
  return (
    <div className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center text-lg font-semibold leading-8">
          Trusted by the world’s most innovative teams
        </h2>
        <div className="mx-auto mt-10 grid grid-cols-1 gap-y-8 md:grid-cols-2 lg:grid-cols-5">
          <div className="flex justify-center items-center mr-2">
            <Building size={44} />
            <span className="text-xl ml-2 mt-2 font-medium">Real Estate Agency</span>
          </div>
          <div className="flex justify-center items-center mr-2">
            <Shield size={44} />
            <span className="text-xl ml-2 mt-2 font-medium">Insurance Agency</span>
          </div>
          <div className="flex justify-center items-center mr-2">
            <User size={46} />
            <span className="text-xl ml-2 mt-2 font-medium">SME Clients</span>
          </div>
          <div className="flex justify-center items-center mr-2">
            <Briefcase size={44} />
            <span className="text-xl ml-2 mt-2 font-medium ">Corporate Partnerships</span>
          </div>
          <div className="flex justify-center items-center mr-2">
            <Calendar size={44} />
            <span className="text-xl ml-2 mt-2 font-medium">Event Management</span>
          </div>
        </div>
      </div>
    </div>
  );
}
