<!-- 拖拽看板 -->
<template>
    <div class="container">
        <div class="item todo">
            <div class="title">TODO</div>
            <div class="todo-box item-box">
                <vuedraggable class="wrapper" v-model="todoList" :options="{group:'team'}">
                    <transition-group>
                        <div class="t-box" v-for="(item) in todoList" :key="item">{{item}}</div>
                    </transition-group>
                </vuedraggable>
            </div>
        </div>
        <div class="item working">
            <div class="title">WORKING</div>
            <div class="working-box item-box">
                <vuedraggable class="wrapper" v-model="workingList" :options="{group:'team'}">
                    <transition-group>
                        <div class="t-box" v-for="(item) in workingList" :key="item">{{item}}</div>
                    </transition-group>
                </vuedraggable>                
            </div>
        </div>
        <div class="item done">
            <div class="title">DONE</div>
            <div class="done-box item-box">
                <vuedraggable class="wrapper" v-model="doneList" :options="{group:'team'}">
                    <transition-group>
                        <div class="t-box" v-for="(item) in doneList" :key="item">{{item}}</div>
                    </transition-group>
                </vuedraggable>                    
            </div>
        </div>
        <div class="listData">
            <div class="todoData listData-box">
                <div class="title">TODO-DATA</div>
                <div class="data">{{todoList.length==0?"[ ]":todoList}}</div>
            </div>
            <div class="workingData listData-box">
                <div class="title">WORKING-DATA</div>
                <div class="data">{{workingList.length==0?"[ ]":workingList}}</div>
            </div>
            <div class="doneData listData-box">
                <div class="title">DONE-DATA</div>
                <div class="data">{{doneList.length==0?"[ ]":doneList}}</div>
            </div>
        </div>
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import vuedraggable from 'vuedraggable';
export default {
  //import引入的组件需要注入到对象中才能使用
    components: { vuedraggable, NProgress },
    data() {
    //这里存放数据
    return {
        todoList: ["Mission 1","Mission 2","Mission 3","Mission 4"],
        workingList: ["Mission 5","Mission 6","Mission 7"],
        doneList: ["Mission 8","Mission 9","Mission 10"]
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
    created() {},
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {NProgress.done();},
    beforeCreate() {NProgress.start();}, //生命周期 - 创建之前
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
    padding: 30px;
    box-sizing: border-box;
    background-color: #fff;

    .item {
        float: left;
        width: 300px;
        background-color: #ccc;
        margin-right: 20px;
        border-radius: 5px;

        .title {
            height: 50px;
            line-height: 50px;
            text-align: center;
            color: #fff;
            border-radius: 5px 5px 0 0;
        }
        .item-box {
            width: 300px;
            padding: 10px;
            box-sizing: border-box;
            background-color: #ccc;
            border-radius: 0 0 5px 5px;

            .t-box {
                width: 280px;
                height: 64px;
                line-height: 64px;
                padding-left: 5px;
                margin: 5px 0;
                box-sizing: border-box;
                background-color: #fff;
                box-shadow: 0 1px 3px 0 rgba(0,0,0,.2);

            }
        }
    }
    .todo, .todoData {
        .title {
            background: #4a9ff9;
        }
    }
    .working, .workingData {
        .title {
            background: #f9944a;
        }
    }
    .done, .doneData {
        margin-right: 0;

        .title {
            background: #2ac06d;
        }
    }

    .wrapper {
        min-height: 35px;

        span {
            display: inline-block;
            width: 100%;
            height: 100%;
        }
    }
    .listData {
        float: left;
        width: 640px;
        height: 300px;

        .listData-box {
            float: left;
            width: 200px;
            height: 300px;
            margin-left: 10px;
            box-sizing: border-box;
            border-radius: 5px;

            .title {
                height: 50px;
                line-height: 50px;
                text-align: center;
                color: #fff;
                border-radius: 5px 5px 0 0;
            }
            .data {
                width: 100%;
                height: 250px;
                line-height: 40px;
                color: #fff;
                border: none;
                padding: 10px;
                box-sizing: border-box;
                border-radius:  0 0 5px 5px;
                background-color: #ccc;
            }
        }
    }
}

</style>