<!-- index首页 -->
<template>
    <div class="container clearfix">
        <div class="menu" :style="conWidth">
            <div class="logo-con" :style="conWidth">
                <div class="title" v-show="!collapse">
                    <span class="title__sider-title is-active" @click="slideLeft">{{logo}}</span>
                </div>
                <div class="title" v-show="collapse">
                    <span class="title__sider-title el-tag--mini" @click="slideRight">LG</span>
                </div>
            </div>
            <el-menu
                :background-color="backgroundColor"
                :text-color="textColor"
                :default-active="$route.meta.pageId"
                :collapse-transition= false
                :collapse="collapse"
                :style="LHeight"
                >
                <template v-for="item in list">
                    <router-link :to="item.url" :key="item.id" v-if="item.children.length===0">
                        <el-menu-item :index="item.id.toString()">
                            <i :class="item.icon"></i>
                            <span slot="title">{{item.name}}</span>
                        </el-menu-item>
                    </router-link>
                    <subMenu v-else :data="item" :key="item.id"></subMenu>
                </template>
            </el-menu>
        </div>
        <transition :name="transitionName" mode="out-in">
            <router-view class="box" :style="rvWidth"/>
        </transition>
    </div>

</template>

<script>
  //这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
  //例如：import 《组件名称》 from '《组件路径》';
import subMenu from "@/components/subMenu.vue";
import { fetchList } from "@/api/views/index";
export default {
  //import引入的组件需要注入到对象中才能使用
    name: "Index",
    components: { subMenu },
    props: {
        transitionName: {
            type: String,
            default: 'v'
        }
    },
    data() {
    //这里存放数据
        return {
            collapse: false, //是否折叠
            list: [], //菜单数据源
            backgroundColor: "#304156", //导航菜单背景颜色
            textColor: "#BFCBD9", //导航菜单文字颜色
            logo: "LOGO", //logo
            LHeight: { height:'' },
            MenuHeight: { height:'' },
            conWidth: { width:'' },
            conWidthValue: '200',
            rvWidth: { width:'' }
            
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        getHeight(){
            this.LHeight.height = window.innerHeight-164+'px';
        },
        setWidth(){
            this.conWidth.width = this.conWidthValue + 'px';
            this.rvWidth.width = window.innerWidth - this.conWidthValue + 'px';
        },
        slideLeft(){
            this.conWidthValue = 64
            this.collapse = true
            this.setWidth()
        },
        slideRight(){
            this.collapse = false
            this.conWidthValue = 200
            this.setWidth()
        }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        this.getHeight()
        this.setWidth()
        this.list = fetchList() // 调用引入的菜单数据
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        window.addEventListener('resize', this.getHeight);
        window.addEventListener('resize', this.setWidth);
    },
    beforeCreate() {}, //生命周期 - 创建之前
    beforeMount() {}, //生命周期 - 挂载之前
    beforeUpdate() {}, //生命周期 - 更新之前
    updated() {}, //生命周期 - 更新之后
    beforeDestroy() {}, //生命周期 - 销毁之前
    destroyed() {}, //生命周期 - 销毁完成
    activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="less" scoped>
.container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    user-select:none;
}
.menu, .box {
    float: left;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
}
.menu {
    user-select:none;
}
.el-menu {
    border-right: none;
    a {
        text-decoration: none;
    }
}
.logo-con {
    height: 84px;
    box-sizing: border-box;
    background-color: rgb(48, 65, 86);

    .title {
        position: relative;
        text-align: center;
        font-size: 20px;
        height: 84px;
        line-height: 84px;

        span {
        color: #409eff;
        font-size: 20px;
        cursor: pointer;
        }
    }
}
.v-enter-active,
.v-leave-active {
    opacity: .5;
    transition: all .5s ease-in-out;
}

.v-enter,
.v-leave-to {
    opacity: 0;
    transform: translate(80px, 0);
}
</style>
