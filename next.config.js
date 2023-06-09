/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ["links.papareact.com", "source.unsplash.com", "cloudflare-ipfs.com", "lh3.googleusercontent.com", "firebasestorage.googleapis.com"],
    },
};

module.exports = nextConfig;
