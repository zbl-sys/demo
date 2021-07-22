const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
if (process.env.NODE_ENV === 'production') {//env中包含了大量的计算机系统信息，通过属性NODE_ENV可以判断当前的环境
    module.exports = {
        devtool: 'none',//不生成源码地图
        plugins: [new BundleAnalyzerPlugin()],//配置打包结果分析的插件
        externals:{//针对一些使用cdn引入的库，不需要打包进最终代码中
        //    vue: 'Vue',
        }
    }
} else {
    module.exports = {}
}