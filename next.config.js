/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'granderby.io',
      'assets.coingecko.com',
      'alchemy.com',
      'nft-cdn.alchemy.com',
      'ipfs.io',
      'via.placeholder.com',
      'ipfs-2.thirdwebcdn.com',
      'res.cloudinary.com',
      'granderby-hosted-content.s3.ap-southeast-1.amazonaws.com',
      'gcdn.ntruss.com',
    ],
  },
}

module.exports = nextConfig


