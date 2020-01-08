<!-- map -->
<template>
    <div id="map" ref="myEchart"></div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import echarts from 'echarts'
import 'echarts/map/js/china.js';
export default {
  //import引入的组件需要注入到对象中才能使用
    components: { NProgress },
    data() {
    //这里存放数据
        return {
            chart: null
        };
    },
  //监听属性 类似于data概念
    computed: {},
  //监控data中的数据变化
    watch: {},
  //方法集合
    methods: {
        chinaConfigure() {
            let myChart = echarts.init(this.$refs.myEchart); //这里是为了获得容器所在位置    
            window.onresize = myChart.resize;
            myChart.setOption({ // 进行相关配置
                backgroundColor: "#02AFDB",
                tooltip: {}, // 鼠标移到图里面的浮动提示框
                dataRange: {
                    show: false,
                    min: 0,
                    max: 1000,
                    text: ['High', 'Low'],
                    realtime: true,
                    calculable: true,
                    color: ['orangered', 'yellow', 'lightskyblue']
                },
                geo: { // 这个是重点配置区
                    map: 'china', // 表示中国地图
                    roam: true,
                    label: {
                        normal: {
                            show: true, // 是否显示对应地名
                            textStyle: {
                            color: 'rgba(0,0,0,0.4)'
                            }
                        }
                    },
                    itemStyle: {
                        normal: {
                            borderColor: 'rgba(0, 0, 0, 0.2)'
                        },
                        emphasis: {
                            areaColor: null,
                            shadowOffsetX: 0,
                            shadowOffsetY: 0,
                            shadowBlur: 20,
                            borderWidth: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                },
                series: [
                    {
                        type: 'scatter',
                        coordinateSystem: 'geo' // 对应上方配置
                    },
                    {
                        name: '面对疾风吧', // 浮动框的标题
                        type: 'map',
                        geoIndex: 0,
                        data: [
                            {
                                "name": "北京",
                                "value": 599
                            }, {
                                "name": "上海",
                                "value": 142
                            }, {
                                "name": "黑龙江",
                                "value": 44
                            }, {
                                "name": "深圳",
                                "value": 92
                            }, {
                                "name": "湖北",
                                "value": 810
                            }, {
                                "name": "四川",
                                "value": 453
                            }, {
                                "name": "云南",
                                "value": 320
                            }, {
                                "name": "新疆",
                                "value": 63
                            }, {
                                "name": "拉萨",
                                "value": 25
                            }, {
                                "name": "山东",
                                "value": 123
                            }, {
                                "name": "河南",
                                "value": 89
                            }
                        ]
                    }
                ]
            })
        }
    },
  //生命周期 - 创建完成（可以访问当前this实例）
    created() {

    },
  //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        this.chinaConfigure();
        NProgress.done();
    },
    beforeCreate() {NProgress.start();}, //生命周期 - 创建之前
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
#map {
    width: 100%;
    height: 100%; 
}
</style>