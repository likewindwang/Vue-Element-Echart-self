<!-- 用户中心 -->
<template>
    <div class="container" ref="boxes">
        <canvas id="canvas" style='background:#111;width: 100%;height: 100%;'></canvas>
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
export default {
    //import引入的组件需要注入到对象中才能使用
    components: { NProgress },
    data() {
        //这里存放数据
        return {
            opChart: {},
            fontSize: 20,
            drops: [],
            str: `AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789`
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        randomColor(){
            let r = Math.floor(Math.random() * 256)
            let g = Math.floor(Math.random() * 256)
            let b = Math.floor(Math.random() * 256)
            return `rgb(${r},${g},${b})`
        }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() { },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        var that = this;
        NProgress.done();
        let canvas = document.getElementById('canvas')
        let context = canvas.getContext('2d')

        //定义画布大小，字体，颜色
        let W = that.$refs.boxes.offsetWidth
        let H = that.$refs.boxes.offsetHeight
        canvas.height = H
        canvas.width = W
        let colunms = Math.floor(W / that.fontSize)
        for (let i = 0; i < colunms; i++) {
            that.drops.push(1000)
        }
        setInterval(function(){
            context.fillStyle = 'rgba(0, 0, 0, 0.05)'
            context.fillRect(0, 0, W, H)
            context.font = '1000 ' + that.fontSize + 'px Consolas'
            // context.fillStyle = '#00cc33'
            context.fillStyle = that.randomColor()
            context.textAlign = 'center'
            for (let i = 0; i < colunms; i++) {
                let index = Math.floor(Math.random() * that.str.length)
                let x = i * that.fontSize
                let y = that.drops[i] * that.fontSize
                //在x,y坐标中随机画str中的一个字符
                context.fillText(that.str[index], x, y)
                //y大于画布高度后，设置随机数，规定是否从顶点重新开始画
                if (y >= H && Math.random() > 0.99) {
                    that.drops[i] = 0
                }
                //每次draw()后，倍数加一，下一个字符画在它的下方
                that.drops[i]++
            }
        }, 30)
    },
    beforeCreate() { NProgress.start(); }, //生命周期 - 创建之前
    beforeMount() {}, //生命周期 - 挂载之前
    beforeUpdate() {}, //生命周期 - 更新之前
    updated() {}, //生命周期 - 更新之后
    beforeDestroy() {}, //生命周期 - 销毁之前
    destroyed() {}, //生命周期 - 销毁完成
    activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang="less" scoped>
.container {
    width: 100%;
    height: 100%;

    #userinfo {
        width: 100%;
        height: 100%;
    }

    #canvas {
        width: 100%;
        height: 100%;
        font-family: "Microsoft YaHei"
    }
}
</style>