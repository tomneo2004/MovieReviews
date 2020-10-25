module.exports = {
    target: "serverless",
    webpack : (config, options) => {
        config.module.rules.push(
            {
                test: /\.(png|jpg|gif)$/i,
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

        return config
    }
}