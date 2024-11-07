/** @type {import('next').NextConfig} */
const nextConfig = {
    hooks: {
      build: async () => {
        await require('child_process').execSync('npx prisma generate');
      },
    },
  };
  
  export default nextConfig;