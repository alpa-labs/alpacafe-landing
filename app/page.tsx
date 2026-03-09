import { Header, Footer } from '@/components/layout';
import {
  HeroSection,
  AboutSection,
  MenuSection,
  ProductsSection,
  EventsSection,
  ContactSection,
} from '@/app/sections';

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
