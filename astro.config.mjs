import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";
import sitemap from "@astrojs/sitemap";

const site = "https://dasveganequartett.de";

const cardPages = Array.from(
  { length: 54 },
  (_, index) => `${site}/cards/${index + 1}/`
);

export default defineConfig({
  site,
  output: "server",
  adapter: vercel(),

  integrations: [
    react(),

    sitemap({
      customPages: cardPages,

      filter: (page) => {
        const pathname = new URL(page).pathname;

        const excludedPrefixes = [
          "/account/",
          "/admin/",
          "/checkout/",
        ];

        const excludedPages = [
          "/freischalten/",
          "/preorder/success/",
          "/preorder/cancelled/",
          "/forum/suggest/",
          "/forum/suggest/new/",
        ];

        return (
          !excludedPrefixes.some((prefix) =>
            pathname.startsWith(prefix)
          ) &&
          !excludedPages.includes(pathname)
        );
      },
    }),
  ],
});