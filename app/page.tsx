import { Header, Footer } from '@/components/shared/layout';
import {
  HeroSection,
  AboutSection,
  MenuSection,
  ProductsSection,
  EventsSection,
  ContactSection,
} from '@/components/features';

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <HeroSection />
        <AboutSection />
        <MenuSection />
        <ProductsSection />
        <EventsSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
}
