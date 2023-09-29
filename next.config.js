/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    webpack: function(config) {
        config.module.rules.push({
            test: /\.md$/,
            use: 'raw-loader',
        })
        
        config.resolve.fallback = {
            fs: false,
            path: false
        };

        return config
    },
    
    compiler: {
        removeConsole: false,
    },
}

module.exports = nextConfig
