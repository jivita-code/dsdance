import type { Media, Project } from "@/types/content";

const localProjectImages: Record<string, string> = {
  "tusker-eye": "/images/home/project-elephant.png",
  "dye-with-movements": "/images/home/project-textile.png",
  "ability-visible": "/images/home/project-ability.png",
  "sri-lankan-dance-masks": "/images/home/project-heritage.png",
  "dance-connect": "/images/home/podcast-editorial.png",
  "movement-workshop": "/images/home/workshop-editorial.png",
};

export function projectCover(item: Project) {
  return item.coverImageUrl || item.media.find((entry) => entry.type === "image")?.url || localProjectImages[item.slug] || "/images/home/vision.png";
}

export function projectMedia(item: Project): Media[] {
  const local = localProjectImages[item.slug];
  return item.media.length ? item.media : local ? [{ url: local, type: "image" }] : [];
}
