import { getDictionary } from "@/content";
import { renderSocialImage, socialImageSize } from "@/lib/social-image";

export const dynamic = "force-static";
export const alt = getDictionary("en").meta.ogAlt;
export const size = socialImageSize;
export const contentType = "image/png";

export default function Image() {
  return renderSocialImage("en");
}
