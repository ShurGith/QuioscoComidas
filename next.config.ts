import type { NextConfig } from "next";

const nextConfig: NextConfig = {


};
module.exports = {
  images: {
    domains: ["localhost", "res.cloudinary.com"],
    qualities: [25, 50, 75],
  },
}
export default nextConfig;
