/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    /**
     * AVIF першим: на фотографіях інтер'єрів він тримає дрібну фактуру
     * (камінь, тканина, дерево) значно краще за WebP при тій самій вазі.
     */
    formats: ["image/avif", "image/webp"],
    /** Додані проміжні розміри — менше зайвого масштабування на телефонах. */
    deviceSizes: [360, 420, 640, 750, 828, 1080, 1200, 1440, 1920, 2560, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512, 640],
    minimumCacheTTL: 31536000,
    // Додайте сюди домени, якщо фото проєктів будуть із CDN або CMS.
    remotePatterns: [],
  },
};

export default nextConfig;
