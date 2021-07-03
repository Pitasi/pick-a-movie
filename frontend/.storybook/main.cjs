const path = require('path');
const WindiCSS = require('windicss-webpack-plugin');

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx|svelte)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-svelte-csf"
  ],
  "svelteOptions": {
    // https://github.com/storybookjs/storybook/issues/11587
    // "preprocess": require("../svelte.config.js").preprocess
  },
  webpackFinal: async (config) => {
    config.resolve = {
      alias: {
        '$app': path.resolve(__dirname, '../node_modules/@sveltejs/kit/assets/runtime/app'),
        '$lib': path.resolve(__dirname, '../src/lib'),
      },
    };

    config.plugins.push(new WindiCSS.default());

    const svelteLoader = config.module.rules.find(
      (r) => r.loader && r.loader.includes("svelte-loader"),
    );
    svelteLoader.options.preprocess = require("svelte-preprocess")({});

    return config;
  }
}