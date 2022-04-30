const px2rem = require('postcss-px2rem');

module.exports = {
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          px2rem({//适配rem配置
            remUnit: 37.5,//根据设计稿除以10得出
          }),
        ],
      },
    },
  },
};
