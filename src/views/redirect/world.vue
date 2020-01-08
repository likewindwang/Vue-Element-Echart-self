<!-- 地球 -->
<template>
    <div>
        <div id="earth"></div>
        <div class="btn">
            <el-button type="primary" @click="toThreeD()">3D</el-button>
            <el-button type="primary" @click="toPlane()">平面</el-button>
        </div>
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import echarts from 'echarts'
import 'echarts/map/js/world.js'
import 'echarts-gl'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
export default {
  //import引入的组件需要注入到对象中才能使用
    components: {NProgress},
    data() {
    //这里存放数据
        return {
                mapChart:{},
                threeD: true,
                //立体球形纹路
                option :{
                    globe: {
                        globeRadius: 83,
                        baseTexture: '',//贴图 球形和平面的吻合
                        silent: true,
                        // environment: require("../static/img/background.jpg"), //背景
                        // heightTexture: require("../static/img/map.jpg"), //地球的整个纹路
                        shading: 'realistic',
                        light: {
                            main: {
                                color: '#fff',
                                intensity: 0,
                                shadow: false,
                                shadowQuality: 'high',
                                alpha: 55,
                                beta: 10
                            },
                            ambient: {
                                color: '#fff',
                                intensity: 1
                            }
                        },
                        postEffect: {
                            enable: false,
                            SSAO: {
                                enable: true,
                                radius: 10
                            }
                        },

                        //地球是否自己转动 autoRotate为true时自己转动
                        viewControl: {
                            autoRotate: true,
                            animationDurationUpdate: 2000,
                            targetCoord: ''
                        }
                    },
                    series: [
                        
                        {
                            name: 'lines3D',
                            type: 'lines3D',
                            coordinateSystem: 'globe',
                            effect: {
                                show: true,
                                period: 2,
                                trailWidth: 3,
                                trailLength: 0.5,
                                trailOpacity: 1,
                                trailColor: '#0087f4'
                            },
                            blendMode: 'lighter',
                            lineStyle: {
                                width: 1,
                                color: '#0087f4',
                                opacity: 0
                            },
                            data: [],
                            silent: false,

                        }

                    ]

                },

                //平面地球 主要是设置地球的样式
                mapOption: {
                    backgroundColor: 'rgba(20,104,121,0.71)',//当和立体球形贴图是海洋的颜色
                    visualMap: {
                        show: false,
                        min: 0,
                        max: 100000
                    },
                    series: [
                        {
                            type: 'map',
                            map: 'world',
                            left: 0,
                            top: 0,
                            right: 0,
                            bottom: 0,
                            environment: 'rgba(0,0,0,0)',
                            boundingCoords: [
                                [-180, 90],
                                [180, -90]
                            ],
                            itemStyle: {
                                normal: {
                                    borderWidth: 2,
                                    borderColor: 'rgb(0,232,232)',//地球纹路的颜色
                                    areaColor: {
                                        type: 'linear',
                                        x: 0,
                                        y: 0,
                                        x2: 0,
                                        y2: 1,
                                        //相邻每个板块 从上到下的颜色变化
                                        colorStops: [{
                                            offset: 0.2, color: 'rgb(0,48,62)' // 0% 处的颜色
                                        }, {
                                            offset: 0.8, color: 'rgba(0,179,188,0.8)' // 100% 处的颜色
                                        }],
                                        global: false // 缺省为 false
                                    },
                                }
                            }
                        }
                    ]
                }
        };
    },
  //监听属性 类似于data概念
    computed: {},
  //监控data中的数据变化
    watch: {},
  //方法集合
    methods: {
        initMap(){
            this.mapChart = this.$echarts.init(document.createElement('canvas'), null, {
                width: 3086,
                height: 3048
            });
            //获取容器并对其初始化
            this.myChart = this.$echarts.init(document.getElementById('earth'))
            //将平面地球和立体球形的纹路重叠
            this.mapChart.setOption(this.mapOption)
            this.option.globe.baseTexture = this.mapChart
            //随机划多条线
            for (let i = 0; i < 150; i++) {
                this.option.series[0].data = this.option.series[0].data.concat(this.rodamData())
            }
            if(this.threeD === true){
                this.myChart.setOption(this.option, true);
            }else {
                this.myChart.setOption(this.mapOption, true);// 平面展开图
            }
        },

        //调用划线方法
        rodamData() {
            //let name = '随机点' + Math.random().toFixed(5) * 100000
            // let longitude = Math.random() * 62 + 73
            let longitude = 105.18
            let longitude2 = Math.random() * 360 - 180
            // let latitude = Math.random() * 50 + 3.52
            let latitude = 37.51
            let latitude2 = Math.random() * 180 - 90
            return {
                coords: [
                    [longitude2, latitude2],
                    [longitude, latitude]
                ],
                value: (Math.random() * 3000).toFixed(2)
            }
        },

        toThreeD(){
            this.threeD = true
            this.initMap()
        },
        toPlane(){
            this.threeD = false
            this.initMap()
        }
    },
  //生命周期 - 创建完成（可以访问当前this实例）
    created() {

    },
  //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        NProgress.done();
        this.initMap()
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
#earth{
    width: 100%;
    height: 100%;
    background: rgba(16, 167, 202, 0.39);
}
    .btn {
        position: fixed;
        right: 20px;
        top: 100px;
        z-index: 99999;

        button {
            width: 70px;
        }
    }
</style>