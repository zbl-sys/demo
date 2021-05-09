module.exports = {
    devServer : {
        proxy: {
            'api/': {
                target: 'http://www.my-site.com'
            }
        }
    },
    // configureWebpack: require('./webpack.config')
}