
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
    target: "serverless",
    compress: true,
    webpack : (config, {isServer}) => {
        config.module.rules.push(
            {
                test: /\.(png|jpg|gif|svg)$/i,
                exclude:{
                    test:[
                        /\.inline.svg$/
                    ]
                },
                use:[
                    {loader:'url-loader'}
                ]
            },
            {
                test: /\.inline.svg$/,
                use: [
                    {loader:'@svgr/webpack'}
                ]
            },
        )

        return config;
    }
})