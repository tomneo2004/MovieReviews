module.exports = {
    target: "serverless",
    webpack : (config, options) => {
        config.module.rules.push(
            {
                test: /\.(png|jpg|gif|svg)$/i,
                use:[
                    {loader:'url-loader'}
                ]
            },
            {
                test: /\.svg$/,
                use: [
                    {loader:'@svgr/webpack'}
                ]
            },
        )

        return config
    }
}