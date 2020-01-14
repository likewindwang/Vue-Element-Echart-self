<!--
 * @Author: your name
 * @Date: 2020-01-08 10:22:56
 * @LastEditTime: 2020-01-14 15:52:39
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \practice\src\views\redirect\paricla.vue
 -->
<!-- 粒子特效 -->
<template>
    <div class="container">
        <vue-particles
            color="#fff"
            :particleOpacity="0.7"
            :particlesNumber="60"
            shapeType="star"
            :particleSize="4"
            linesColor="#fff"
            :linesWidth="1"
            :lineLinked="true"
            :lineOpacity="0.4"
            :linesDistance="150"
            :moveSpeed="2"
            :hoverEffect="true"
            hoverMode="grab"
            :clickEffect="true"
            clickMode="push"
            class="example"
        >
        </vue-particles>
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
    components: {},
    data() {
    //这里存放数据
        return {

    };
    },
  //监听属性 类似于data概念
    computed: {},
  //监控data中的数据变化
    watch: {},
  //方法集合
    methods: {

    },
  //生命周期 - 创建完成（可以访问当前this实例）
    created() {

    },
  //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {

    },
    beforeCreate() {}, //生命周期 - 创建之前
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
    overflow: hidden;
    background: #000;

}
</style>