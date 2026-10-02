import { Hero } from '@/components/sections/Hero';
import { Results } from '@/components/sections/Results';
import { Problem } from '@/components/sections/Problem';
import { Services } from '@/components/sections/Services';
import { Statement } from '@/components/sections/Statement';
import { Method } from '@/components/sections/Method';
import { Philosophy } from '@/components/sections/Philosophy';
import { Cases } from '@/components/sections/Cases';
import { About } from '@/components/sections/About';
import { Timeline } from '@/components/sections/Timeline';
import { Toolkit } from '@/components/sections/Toolkit';
import { Talks } from '@/components/sections/Talks';
import { Insights } from '@/components/sections/Insights';
import { Contact } from '@/components/sections/Contact';

/**
 * The home page is a composition and nothing else. Every section owns its own
 * layout, copy comes from /content and the reading rhythm is the order below:
 * wide → evidence → narrative → visualisation → sticky services → statement →
 * method → cases → personal story → tools → talks → insights → contact.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Results />
      <Problem />
      <Services />
      <Statement />
      <Method />
      <Philosophy />
      <Cases />
      <About />
      <Timeline />
      <Toolkit />
      <Talks />
      <Insights />
      <Contact />
    </>
  );
}
