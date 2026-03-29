export type DemoStatus = "draft" | "published";

export type DemoMeta = {
  slug: string;
  title: string;
  description: string;
  stack: string[];
  coverImage?: string;
  status: DemoStatus;
  sourcePath: string;
  localUrl?: string;
  productionUrl?: string;
};
