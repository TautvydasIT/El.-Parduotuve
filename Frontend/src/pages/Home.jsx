import Hero from "../components/Hero";
import SectionTitle from "../components/SectionTitle";
import TypesGrid from "../components/TypesGrid";

export default function Home() {
  return (
    <>
      <Hero />
      <SectionTitle title="Produktų tipai" subtitle="Pasirinkite kategoriją, kad pamatytumėte prekes" />
      <TypesGrid />
    </>
  );
}
