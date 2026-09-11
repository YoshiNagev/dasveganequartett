import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";
import sitemap from "@astrojs/sitemap";

const site = "https://dasveganequartett.de";

const publicCardIds = [1, 16, 24, 29, 37, 48];

const cardPages = publicCardIds.map(
  (id) => `${site}/cards/${id}/`
);

const publicCardPaths = new Set(
  publicCardIds.map((id) => `/cards/${id}/`)
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
          "/shop/",
        ];

        if (
          /^\/cards\/\d+\/?$/.test(pathname)
        ) {
          const normalizedPath = pathname.endsWith("/")
            ? pathname
            : `${pathname}/`;

          return publicCardPaths.has(normalizedPath);
        }

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