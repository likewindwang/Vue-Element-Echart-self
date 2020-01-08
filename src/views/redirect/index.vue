<!-- index.vue -->
<template>
    <div class="index-container">
        <div class="chart-sort">
            <div class="sort-item" v-for="(item) in itemList" :key="item.title" @click="ckChart(item.icon)" >
                <svg-icon :class-name="item.icon" :icon-class="item.icon" />
                <div class="detail">
                    <div>{{item.title}}</div>
                    <span>{{item.number|NumFormat}}</span>
                </div>
            </div>
        </div>
        <div class="chart-box" id="myChart" v-resize="myChart"></div>
        <div class="box-chart">
            <div class="box-item" id="itemBrowser" v-resize="resizeItemCharts"></div>
            <div class="box-item" id="itemRose" v-resize="resizeItemCharts"></div>
            <div class="box-item" id="itemAxe" v-resize="resizeItemCharts"></div>
        </div>
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { fetchOption, fetchOptionBr, fetchOptionRose, fetchItem, fetchOptionAxe, filterNumber } from "@/api/views/index"
export default {
  //import引入的组件需要注入到对象中才能使用
    name:'index',
    components: { NProgress },
    data() {
    //这里存放数据
        return {
            itemList: [],
            option: {},
            goodItem:null,
            badItem:null,
            optionBr: {},
            optionRose: {},
            optionAxe: {}
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        smoothLine(){
            var that = this
            // 基于准备好的dom，初始化echarts实例
            let myChart = that.$echarts.init(document.getElementById('myChart'))
            // 绘制图表
            myChart.setOption({
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#1E98D3' // 
                        }
                    }
                },
                grid: {
                    left: '1%',
                    right: '1%',
                    bottom: '3%',
                    containLabel: true
                },
                legend: {
                    left: 'center',
                    data: ['good', 'bad']
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
                    axisLabel : {
                        formatter: '{value}',
                        textStyle: { //改变刻度字体样式
                            color: '#1E98D3'
                        }
                    }
                },
                yAxis: {
                    type: 'value',
                    axisPointer: {
                        snap: true
                    },
                    axisLabel : {
                        formatter: '{value}',
                        textStyle: {    //改变刻度字体样式
                            color: '#1E98D3'
                        }
                    }
                },
                series: [
                    {
                        name:'good',
                        type:'line',
                        smooth: true,
                        color: "#FF005A",
                        data: this.goodItem,
                    },
                    {
                        name:'bad',
                        type:'line',
                        smooth: true,
                        color: "#3888FA",
                        areaStyle: {
                            color: 'rgba(204,204,204, .3)'
                        },
                        data: this.badItem,
                    }
                ]
            }, true);
        },
        ckChart(item){
            this.goodItem = this.option.good[item]
            this.badItem = this.option.bad[item]
            this.smoothLine();
        },
        initItemCharts(){
            let myChartBr = this.$echarts.init(document.getElementById('itemBrowser'))
            let myChartRose = this.$echarts.init(document.getElementById('itemRose'))
            let myChartAxe = this.$echarts.init(document.getElementById('itemAxe'))
            myChartBr.setOption(this.optionBr)
            myChartRose.setOption(this.optionRose)
            myChartAxe.setOption(this.optionAxe)
        },
        resizeItemCharts() {  // 当宽高变化时就会执行
        //执行某些操作
            this.initItemCharts()
        },
        myChart() {
            // this.smoothLine()
        }
    },
    filters: {
        NumFormat: filterNumber
    },
    directives: {  // 使用局部注册指令的方式
        resize: { // 指令的名称
            bind(el, binding) { // el为绑定的元素，binding为绑定给指令的对象
                let width = '', height = '';
                
                function isReize() {
                    const style = document.defaultView.getComputedStyle(el);
                    if (width !== style.width || height !== style.height) {
                        binding.value();  // 关键
                    }
                    width = style.width;
                    height = style.height;
                }
                el.__vueSetInterval__ = setInterval(isReize, 300);
            },
            unbind(el) {
                clearInterval(el.__vueSetInterval__);
            }
        }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        this.itemList = fetchItem()
        this.option = fetchOption()
        this.optionBr = fetchOptionBr()
        this.optionRose = fetchOptionRose()
        this.optionAxe = fetchOptionAxe()
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        this.goodItem = this.option.good.peoples
        this.badItem = this.option.bad.peoples
        this.smoothLine();
        this.initItemCharts();
        
        NProgress.done(); 
    },
    beforeCreate() {
        NProgress.start(); 
    }, //生命周期 - 创建之前
    beforeMount() {}, //生命周期 - 挂载之前
    beforeUpdate() {}, //生命周期 - 更新之前
    updated() {}, //生命周期 - 更新之后
    beforeDestroy() {
        if (!this.chart) {
            return;
        }
        this.chart.dispose();
        this.chart = null;
    }, //生命周期 - 销毁之前
    destroyed() {}, //生命周期 - 销毁完成
    activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
    }
</script>
<style lang="less" scoped>
.index-container {
    width: 100%;
    padding: 30px;
    overflow-y: auto;
    box-sizing: border-box;
    background-color: #EFF1F4;
}
.chart-sort {
    width: 100%;
    height: 120px;
    line-height: 120px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;

    .sort-item {
        width: 24%;
        height: 100%;
        cursor: pointer;
        border-radius: 5px;
        background-color: #fff;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 0 35px;
        box-sizing: border-box;
        svg {
            font-size: 48px;
            padding: 10px;
            border-radius: 5px;
        }
    }
}
.chart-box {
    height: 360px;
    margin-top: 30px;
    margin-bottom: 30px;
    padding: 16px 16px 0;
    background-color: #fff;
    border-radius: 3px;
    box-sizing: border-box;
    >div, >canvas {
        width: 100%;
        height: 100%;
    }

}
.peoples { color: #40c9c6; }
.wechat { color: #36A3F7; }
.star { color: #F4516C; }
.skill { color: #34BFA3; }

.detail {
    margin: 26px 30px 26px 0;
    line-height: 34px;

    div {
        height: 34px;
        font-size: 18px;
        font-family: Arial, Helvetica, sans-serif;
        color: rgba(0,0,0,.45);
    }
    span {
        height: 34px;
        font-size: 20px;
        font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Arial,sans-serif;
        color: #666;
    }
}
// .sort-item:hover svg {
//     background-color: #ccc;
//     color: #fff;
// }
.box-chart {
    width: 100%;
    height: 320px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;

    .box-item {
        width: 32%;
        height: 320px;
        border-radius: 5px;
        background-color: #fff;
    }
}
// .picc, .aaa {
//     width: 500px;
//     height: 280px;
//     overflow: hidden;
// }
// .picc:hover {
//     width: 520px;
//     height: 300px;
//     -webkit-filter: contrast(130%); /* Chrome, Safari, Opera */
//     filter: contrast(130%);
//     transition: all .2s linear;
// }
</style>