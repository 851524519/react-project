/* 
 * @file config-overrides.js
 * @author Fan Qiang(851524519@qq.com)
 * 基于customize和react-app-rewired的定制化配置文件
 * 
 * 
*/

// 从customize-cra引入一些相关的方法
const { 
    override,
    addLessLoader,
    fixBabelImports
 } = require('customize-cra')

const modifyVars = require('./lessVars')

module.exports = override(
    addLessLoader({
        javascriptEnabled: true,
        modifyVars
    }),
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
)
