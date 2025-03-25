/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        
        {
          protocol: 'https',
          hostname: 'res.cloudinary.com',
          port: '',
          pathname: '/**',
        },
      ],
    },
    api: {
      bodyParser: false, 
      sizeLimit: '25mb', 
    },
  };
  
  export default nextConfig;
  