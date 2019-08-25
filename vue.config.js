
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    publicPath: isProduction ? "/" : "/",
    devServer: {
        port: 9090,     // 端口
    },
    lintOnSave: false,   // 取消 eslint 验证
    css: {
        loaderOptions: {
            less: {
                modifyVars: {
                    'green': '#1DA57A',
                    'primary-color': '#1DA57A',
                    'link-color': '#1DA57A',
                    'border-radius-base': '2px',
                    'blue': '#3a82f8',
                    'text-color': '#333'
                },
                javascriptEnabled: true
            }
        }
    },
    chainWebpack: config => {
        // remove the prefetch plugin
        config.plugins.delete('prefetch');
        // remove the preload plugin
        config.plugins.delete('preload');
    },
};
