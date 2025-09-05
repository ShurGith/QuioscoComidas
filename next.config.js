/** @type {import('next').NextConfig} */
const nextConfig = {

  reactStrictMode: true,

};
module.exports = {
  images: {
    domains: ["localhost", "res.cloudinary.com"],
    qualities: [25, 50, 75],
  },
}
module.exports = nextConfig
