import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Steps from "@/components/Steps";

export default function Home() {
  return (
    <>
      <main tabIndex={-1}>
        <Hero />
        <Steps />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
