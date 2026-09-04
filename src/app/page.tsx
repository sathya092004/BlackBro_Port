import { MotionConfig } from "framer-motion";
import {
  OpeningLogo,
  Hero,
  GenderSplit,
  FeaturedCollection,
  Campaign,
  BrandStory,
  AboutUs,
  Privilege,
  Lookbook,
  ShopTheLook,
  SocialGallery,
  Newsletter,
} from "@/components/home";

export default function HomePage() {
  return (
    <MotionConfig reducedMotion="user">
      <OpeningLogo />
      <Hero />
      <GenderSplit />
      <FeaturedCollection />
      <Campaign />
      <BrandStory />
      <AboutUs />
      <Privilege />
      <Lookbook />
      <ShopTheLook />
      <SocialGallery />
      <Newsletter />
    </MotionConfig>
  );
}
