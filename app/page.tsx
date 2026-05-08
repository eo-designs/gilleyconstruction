import HeroVideo from "@/components/HeroVideo";
import LicenseBanner from "@/components/LicenseBanner";
import ServicesGrid from "@/components/ServicesGrid";
import ProjectShowcase from "@/components/ProjectShowcase";
import ContactCTA from "@/components/ContactCTA";

export default function HomePage() {
  return (
    <>
      <HeroVideo />
      <LicenseBanner />
      <ServicesGrid />
      <ProjectShowcase limit={6} />
      <ContactCTA />
    </>
  );
}
