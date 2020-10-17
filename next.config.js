module.exports = {
    // target: "serverless",
    webpack : (config, _options) => {
        config.module.rules.push({
            test: /\.(png|jpg|gif)$/i,
            use:[
                {
                    loader: 'url-loader',
                }
            ]
        })

        return config
    }
}