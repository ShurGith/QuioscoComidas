/** @type {import('next').NextConfig} */
const nextConfig = {

  reactStrictMode: true,
  eslint: {
    // Advertencia: Esto deshabilitará ESLint durante la compilación.
    ignoreDuringBuilds: true,
  },

};
module.exports = {
  images: {
    domains: ["localhost", "res.cloudinary.com"],
    qualities: [25, 50, 75],
  },
}
module.exports = nextConfig
