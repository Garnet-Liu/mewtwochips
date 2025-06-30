import { InjectManifest } from "workbox-webpack-plugin";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // reactStrictMode: false, // 默认是 true
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "pbs.twimg.com",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },
    ],
  },
  webpack: (config, options) => {
    if (!options.isServer) {
      // https://github.com/vercel/next.js/issues/33863#issuecomment-1140518693
      const workboxPlugin = new InjectManifest({
        swSrc: "./scripts/sw/firebase-sw",
        swDest: "../public/firebase-sw.js",
        include: ["__nothing__"],
        // In dev, exclude everything.
        // This avoids irrelevant warnings about chunks being too large for caching.
        // In non-dev, use the default `exclude` option, don't override.
        ...(options.dev ? { exclude: [/./] } : undefined),
      });

      if (options.dev) {
        // Suppress the "InjectManifest has been called multiple times" warning by reaching into
        // the private properties of the plugin and making sure it never ends up in the state
        // where it makes that warning.
        // https://github.com/GoogleChrome/workbox/blob/v6/packages/workbox-webpack-plugin/src/inject-manifest.ts#L260-L282
        Object.defineProperty(workboxPlugin, "alreadyCalled", {
          get() {
            return false;
          },
          set() {
            // do nothing; the internals try to set it to true, which then results in a warning
            // on the next run of webpack.
          },
        });
      }
      config.plugins.push(workboxPlugin);
    }

    return config;
  },
};

export default nextConfig;
