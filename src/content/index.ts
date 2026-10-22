import { getSiteUrl, isPreviewDeploy } from "@/lib/site-env";
import { education } from "./education";
import { experience } from "./experience";
import { profile as baseProfile } from "./profile";
import { projects } from "./projects";
import { seo as baseSeo } from "./seo";
import { skills } from "./skills";
import type { SiteContent } from "./types";

export type { SiteContent } from "./types";
export * from "./types";

const siteUrl = getSiteUrl();
const preview = isPreviewDeploy();

export const content: SiteContent = {
  profile: {
    ...baseProfile,
    url: siteUrl,
  },
  experience,
  projects,
  skills,
  education,
  seo: {
    ...baseSeo,
    canonical: `${siteUrl}/`,
    robots: preview ? "noindex, nofollow" : baseSeo.robots,
  },
};
