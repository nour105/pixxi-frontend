import HeroSearch from "./components/home/HeroSearch";
import FeaturedProperties from "./components/home/FeaturedProperties";
import PopularAreas from "./components/home/PopularAreas";
import TopDevelopers from "./components/home/TopDevelopers";
import FeaturedProjectsByCity from "./components/home/FeaturedProjectsByCity";

export default function HomePage() {
  return (
    <>
      <HeroSearch />
      <FeaturedProjectsByCity />
      {/* <PopularAreas /> */}
      <TopDevelopers />
    </>
  );
}
