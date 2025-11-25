import Hero from "../components/Hero";
import SectionTitle from "../components/SectionTitle";
import TypesGrid from "../components/TypesGrid";

export default function Home() {
  return (
    <>
      <Hero />
      <SectionTitle title="Product types" subtitle="Choose a category to explore our products" />
      <TypesGrid />
    </>
  );
}
