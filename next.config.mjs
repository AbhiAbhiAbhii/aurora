/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // domains: ['tgvvlxlnvewlnvcmnfyz.supabase.co']
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'tgvvlxlnvewlnvcmnfyz.supabase.co',
                port: '',
                pathname: '/**'
            }
        ]
    }
};

export default nextConfig;
