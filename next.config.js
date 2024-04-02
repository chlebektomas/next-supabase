const MillionLint = require('@million/lint')
/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'img.pokemondb.net',
                port: '',
            },
        ],
    },
    logging: {
        fetches: {
            level: 'verbose',
            fullUrl: true,
        },
    },
    experimental: {
        scrollRestoration: true,
    },
}

module.exports = MillionLint.next({
    rsc: true,
})(nextConfig)
