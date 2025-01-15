/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'akitzcniztthkgqqtqox.supabase.co',
                port: '',
                pathname: '/**',
                search: '',
            },
        ],
    },
};

export default nextConfig;