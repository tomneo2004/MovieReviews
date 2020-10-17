module.exports = {
    webpackFinal: async (baseConfig) => {
        const nextConfig = require('../next.config');

        const rules = baseConfig.module.rules;

        // modify storybook's file-loader rule to avoid conflicts with your inline svg
        const fileLoaderRule = rules.find(rule => rule.test.test('.svg'));
        fileLoaderRule.exclude = /\.inline.svg$/;
  
        // merge whatever from nextConfig into the webpack config storybook will use
        const config = { 
          ...baseConfig, 
          module:{...baseConfig.module, rules: nextConfig.webpack(baseConfig,null).module.rules}
        };
        return config;
    },
    stories: ['../src/**/*.stories.@(tsx)']
};