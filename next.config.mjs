/** @type {import('next').NextConfig} */
const nextConfig = {
   images:{
     remotePatterns:[
        {
            protocol:"https",
            hostname:"randomuser.me" 
        },
        {
            protocol:"https",
            hostname:"www.juit.ac.in" 
        }
    ]
   }
};

export default nextConfig;
