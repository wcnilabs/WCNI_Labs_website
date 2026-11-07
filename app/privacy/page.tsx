import type { Metadata } from "next";
import { getDictionary } from "@/content";
import { PrivacyPage } from "@/views/PrivacyPage";

const t = getDictionary("en");

export const metadata: Metadata = {
  title: t.privacy.metaTitle,
  description: t.privacy.metaDescription,
  alternates: { canonical: "/privacy/" },
  openGraph: { url: "/privacy/", title: t.privacy.metaTitle, description: t.privacy.metaDescription },
};

export default function Page() {
  return <PrivacyPage locale="en" />;
}
