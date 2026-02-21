import { getContent } from "@/lib/content";
import { AboutContent } from "./AboutContent";

export default function AboutPage() {
  const content = getContent();
  return (
    <AboutContent
      storyP1={content.about.storyP1}
      storyP2={content.about.storyP2}
    />
  );
}
