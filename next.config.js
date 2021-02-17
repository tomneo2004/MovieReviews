module.exports = {
    target: "serverless",
    webpack : (config, options) => {
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

        return config
    }
}