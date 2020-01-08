<!-- 折线图 -->
<template>
  <div class="container">
      <div id="bkLine"></div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { fetchOptionBkLine } from "@/api/views/index"
export default {
    //import引入的组件需要注入到对象中才能使用
    components: {NProgress},
    data() {
        //这里存放数据
        return {
            chart: null,
            id: 'bkLine'
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        initEcharts() {
            let t = this;
            this.chart = this.$echarts.init(document.getElementById(this.id))
            this.chart.setOption({
            backgroundColor: '#394056',
            title: {
                top: 20,
                text: '提问',
                textStyle: {
                    fontWeight: 'normal',
                    fontSize: 16,
                    color: '#F1F1F3'
                },
                left: '1%'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    lineStyle: {
                    color: '#57617B'
                    }
                }
            },
            legend: {
                top: 20,
                icon: 'rect',
                itemWidth: 14,
                itemHeight: 5,
                itemGap: 13,
                data: ['提莫队长', '德邦总管', '皮城守备'],
                right: '4%',
                textStyle: {
                    fontSize: 12,
                    color: '#F1F1F3'
                }
            },
            grid: {
                top: 100,
                left: '2%',
                right: '2%',
                bottom: '2%',
                containLabel: true
            },
            xAxis: [{
                type: 'category',
                boundaryGap: false,
                axisLine: {
                    lineStyle: {
                    color: '#57617B'
                    }
                },
                data: ['13:00', '13:05', '13:10', '13:15', '13:20', '13:25', '13:30', '13:35', '13:40', '13:45', '13:50', '13:55']
            }],
            yAxis: [{
                type: 'value',
                name: '(%)',
                axisTick: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                    color: '#57617B'
                    }
                },
                axisLabel: {
                    margin: 10,
                    textStyle: {
                    fontSize: 14
                    }
                },
                splitLine: {
                    lineStyle: {
                    color: '#57617B'
                    }
                }
            }],
            series: [{
                name: '提莫队长',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 5,
                showSymbol: false,
                lineStyle: {
                    normal: {
                    width: 1
                    }
                },
                areaStyle: {
                    normal: {
                    color: new t.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(137, 189, 27, 0.3)'
                    }, {
                        offset: 0.8,
                        color: 'rgba(137, 189, 27, 0)'
                    }], false),
                    shadowColor: 'rgba(0, 0, 0, 0.1)',
                    shadowBlur: 10
                    }
                },
                itemStyle: {
                    normal: {
                    color: 'rgb(137,189,27)',
                    borderColor: 'rgba(137,189,2,0.27)',
                    borderWidth: 12

                    }
                },
                data: [220, 182, 191, 134, 150, 120, 110, 125, 145, 122, 165, 122]
            }, {
                name: '德邦总管',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 5,
                showSymbol: false,
                lineStyle: {
                    normal: {
                    width: 1
                    }
                },
                areaStyle: {
                normal: {
                    color: new t.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(0, 136, 212, 0.3)'
                    }, {
                        offset: 0.8,
                        color: 'rgba(0, 136, 212, 0)'
                    }], false),
                    shadowColor: 'rgba(0, 0, 0, 0.1)',
                    shadowBlur: 10
                }
            },
            itemStyle: {
                normal: {
                    color: 'rgb(0,136,212)',
                    borderColor: 'rgba(0,136,212,0.2)',
                    borderWidth: 12

                }
            },
                data: [120, 110, 125, 145, 122, 165, 122, 220, 182, 191, 134, 150]
            }, {
                name: '皮城守备',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 5,
                showSymbol: false,
                lineStyle: {
                normal: {
                    width: 1
                }
            },
            areaStyle: {
                normal: {
                    color: new t.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(219, 50, 51, 0.3)'
                    }, {
                    offset: 0.8,
                    color: 'rgba(219, 50, 51, 0)'
                    }], false),
                    shadowColor: 'rgba(0, 0, 0, 0.1)',
                    shadowBlur: 10
                }
            },
            itemStyle: {
                normal: {
                    color: 'rgb(219,50,51)',
                    borderColor: 'rgba(219,50,51,0.2)',
                    borderWidth: 12
                    }
                },
                data: [220, 182, 125, 145, 122, 191, 134, 150, 120, 110, 165, 122]
            }]
        })
            }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        
        
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        this.initEcharts()
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
            return
        }
        this.chart.dispose()
        this.chart = null
    }, //生命周期 - 销毁之前
    destroyed() {}, //生命周期 - 销毁完成
    activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang="less" scoped>
.container {
    width: 100%;
    height: 100%;
    background-color: #394056;

    #bkLine {
        width: 100%;
        height: 100%;
    }
}
</style>