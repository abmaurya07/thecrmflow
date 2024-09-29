'use client';

import Hero from './_PageSections/Hero';
import FeatureList from './_PageSections/FeatureList';
import Feature from './_PageSections/Feature';
import LogoCloud from './_PageSections/LogoCloud';
import CTA from './_PageSections/CTA';
// have links to FAQ

// link to pricing in CTA

export default function Landing() {
  return (
    <div>
      <Hero />
      <LogoCloud />
      <FeatureList />
      <Feature sliceFrom={0} sliceTo={2}/>
      <Feature sliceFrom={2} sliceTo={4} isFlipped={true} />
      <Feature sliceFrom={4} sliceTo={6} />
      <CTA />
    </div>
  );
}
