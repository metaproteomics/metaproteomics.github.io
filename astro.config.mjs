import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import astroIcon from "astro-icon";

export default defineConfig({
  site: "https://metaproteomics.org",
  integrations: [
    tailwind(),
    mdx(),
    sitemap(),
    astroIcon(),
  ],
});
