//  vue.config.js
'use strict'
const path = require('path')

const express = require('express');
const app = express(); //请求server

const appData = require('./data.json'); //加载本地数据文件 
const data = appData.json; //获取对应的本地数据
const jk = appData.jk;
 
const apiRoutes = express.Router();
app.use('/api', apiRoutes); //通过路由请求数据


function resolve(dir) {
    return path.join(__dirname, dir)
}
  
module.exports = {
    publicPath: './',  // 配置基本url
    // 将构建好的文件输出到哪里
    outputDir: 'dist',
    assetsDir: 'static',
    configureWebpack: {
        // provide the app's title in webpack's name field, so that
        // it can be accessed in index.html to inject the correct title.
        // name: name,
        resolve: {
          alias: {
            '@': resolve('src')
          }
        }
    },
    chainWebpack(config) {
        config.resolve.symlinks(true), // 热更新

        // set svg-sprite-loader
        config.module
        .rule('svg')
        .exclude.add(resolve('src/icons'))
        .end()
        config.module
        .rule('icons')
        .test(/\.svg$/)
        .include.add(resolve('src/icons'))
        .end()
        .use('svg-sprite-loader')
        .loader('svg-sprite-loader')
        .options({
            symbolId: 'icon-[name]'
        })
        .end()
    },

    devServer: {
        open: true,
        host: '127.0.0.1',
        port: 9999,
        https: false,
        hotOnly: true,
        // proxy: {
        //     '/api': {
        //         target: 'http://www.example.org', // 域名
        //         changeOrigin: true, // 开启代理
        //         ws: true, // 是否启用websockets
        //         pathRewrite: {
        //           '^/api': ''
        //         }
        //     }
        // },
        before: app => {
            app.get('/api/data', (req, res) => {
                res.json({
                    code: 200,
                    data: data
                }) 
            }),
            app.get('/api/jk', (req, res) => {
                res.json({
                    code: 200,
                    data: jk
                }) 
            })
        }
    },


    lintOnSave: false, // 屏蔽掉eslint的waring

    // 三方插件的选项
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: [],
        }
    }
}
