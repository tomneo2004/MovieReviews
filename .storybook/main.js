module.exports = {
    webpackFinal: async (baseConfig) => {
        // const nextConfig = require('../next.config');

        // modify storybook's file-loader rule to avoid conflicts with your inline svg
        const fileLoaderRule = baseConfig.module.rules.find(rule => rule.test.test('.svg'));
        fileLoaderRule.exclude = /\.inline.svg$/;
  
        // merge whatever from nextConfig into the webpack config storybook will use
        // const config = { 
        //   ...baseConfig, 
        //   module:{...baseConfig.module, rules: nextConfig.webpack(baseConfig,null).module.rules}
        // };
        // return config;
        
        baseConfig.module.rules.push({
          test: /\.inline.svg$/,
          enforce: 'pre',
          loader: require.resolve('@svgr/webpack'),
        });
        return baseConfig
    },
    stories: ['../src/**/*.stories.@(tsx)']
};