/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true
    },
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
    typescript: {
        ignoreBuildErrors: true,
    }
};

export default nextConfig;
