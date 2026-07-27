/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Додайте сюди домени, якщо фото проєктів будуть із CDN або CMS.
    remotePatterns: [],
  },
};

export default nextConfig;
