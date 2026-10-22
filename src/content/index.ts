import { education } from "./education";
import { experience } from "./experience";
import { profile } from "./profile";
import { projects } from "./projects";
import { seo } from "./seo";
import { skills } from "./skills";
import type { SiteContent } from "./types";

export type { SiteContent } from "./types";
export * from "./types";

export const content: SiteContent = {
  profile,
  experience,
  projects,
  skills,
  education,
  seo,
};
