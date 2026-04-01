import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Bespoke from "@/components/Bespoke";
import Collection from "@/components/Collection";
import Process from "@/components/Process";
import SocialProof from "@/components/SocialProof";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollProgressRail from "@/components/ui/ScrollProgressRail";

export default function Home() {
  return (
    <main>
      <Header />
      <ScrollProgressRail />
      <Hero />
      <Bespoke />
      <Collection />
      <Process />
      <SocialProof />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
