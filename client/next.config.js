/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@trpc/client", "@trpc/react-query"],
};

module.exports = nextConfig;
