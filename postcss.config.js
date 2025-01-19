const prefixWrap = require('postcss-prefixwrap');

module.exports = {
  plugins: [
    require('autoprefixer'),
    prefixWrap('.chipopino-css-prefix',{
      ignoredSelectors: [/^\.__no_prefix_(.+)$/],
      nested: "&",
    }) 
  ],
};