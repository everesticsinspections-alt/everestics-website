import { getContent } from "@/lib/content";
import { AboutContent } from "./AboutContent";

export default async function AboutPage() {
  const content = await getContent();
  return (
    <AboutContent
      storyP1={content.about.storyP1}
      storyP2={content.about.storyP2}
    />
  );
}
