/** @type {import("next").NextConfig} */
const nextConfig = {
  // async headers() {
  //   return [
  //     {
  //       // Apply these headers to all routes in your application.
  //       source: "/:path*",
  //       headers: [{ key: "Access-Control-Allow-Origin", value: "*" }],
  //     },
  //   ];
  // },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        port: "",
        pathname: "/PokeAPI/sprites/master/sprites/pokemon/**",
      },
      {
        protocol: "https",
        hostname: "pbs.twimg.com",
        port: "",
        pathname: "/media/**",
      },
      {
        protocol: "https",
        hostname: "api-assets.clashofclans.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
