/** @type {import('next').NextConfig} */
const config = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ['newton-project-resume-backend.s3.ap-south-1.amazonaws.com', 'images.unsplash.com'],
  },
};

module.exports = config;