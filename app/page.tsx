import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import VideoModalProvider from '@/components/ui/VideoModal';
import MobileCta from '@/components/ui/MobileCta';
import { btnFooter } from "@/components/ui/button";
import Hero from '@/components/home/Hero';
import VideoCards from '@/components/home/VideoCards';
import Logos from '@/components/home/Logos';
import YouTubeSection from '@/components/home/YouTubeSection';
import CaseStudies from '@/components/home/CaseStudies';
import Testimonials from '@/components/home/Testimonials';
import Partners from '@/components/home/Partners';
import Pricing from '@/components/home/Pricing';
import Faq from '@/components/home/Faq';
import QualifySection from '@/components/home/QualifySection';

/**
 * Order: Section 1 (hero, offerings, VSL, 4 video cards) -> client logos -> Section 2 (YouTube case studies)
 * -> case studies -> testimonials -> technology partners -> Section 4 pricing -> Section 3 FAQ
 * -> Section 4 qualify form -> footer.
 */
export default function Home() {
  return (
    <VideoModalProvider>
      <Header />
      <main>
        <Hero />
        <VideoCards />
        <Logos />
        <YouTubeSection />
        <CaseStudies />
        <Testimonials />
        <Partners />
        <Pricing />
        <Faq />
        <QualifySection />
      </main>
      <Footer btnClass={btnFooter} />
      <MobileCta />
    </VideoModalProvider>
  );
}
