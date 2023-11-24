import Footer from "./_components/footer";
import Hero from "./_components/hero";
import { MainHeading } from "./_components/mainHeading";

const LandingPage = () => {
  return (
    <main className="min-h-full flex flex-col pt-40 dark:bg-[#121212]">
      <section className="flex items-center flex-col justify-center md:justify-start text-center gap-y-8 flex-1 px-6 pb-10">
        <MainHeading />
        <Hero />
      </section>
      <Footer />
    </main>
  );
};

export default LandingPage;
