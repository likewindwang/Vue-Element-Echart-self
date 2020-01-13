export function fetchList() {
    let List = [
        {
            name: "首页",
            id: -1,
            icon: "el-icon-picture-outline-round",
            url: "/index",
            children: []
        },
        {
            name: "路由嵌套",
            id: 1,
            icon: "el-icon-s-unfold",
            url: "",
            children: [
                {
                    id: 2,
                    parentid: 1,
                    name: "菜单1-1",
                    icon: "el-icon-chat-dot-round",
                    url: "",
                    children: [
                        {
                        id: 3,
                        parentid: 1,
                        name: "菜单1-1-1",
                        icon: "el-icon-cloudy",
                        url: "",
                        children: []
                        },
                        {
                        id: 4,
                        parentid: 1,
                        name: "菜单1-1-2",
                        icon: "el-icon-files",
                        url: "",
                        children: []
                        }
                    ]
                },
                {
                id: 5,
                parentid: 1,
                name: "菜单1-2",
                icon: "el-icon-shopping-cart-1",
                url: "",
                children: []
                }
            ]
        },
        {
            name: "Echarts图表",
            id: 6,
            icon: "el-icon-s-data",
            url: "",
            children: [
                {
                    id: 7,
                    parentid: 2,
                    name: "键盘图",
                    icon: "el-icon-folder-checked",
                    url: "/keyboard",
                    children: []
                },
                {
                    id: 8,
                    parentid: 2,
                    name: "折线图",
                    icon: "el-icon-folder-remove",
                    url: "/brokenLine",
                    children: []
                },
                {
                    id: 9,
                    parentid: 3,
                    name: "地理图",
                    icon: "el-icon-paperclip",
                    url: "/map",
                    children: []
                },
                {
                    id: 10,
                    parentid: 4,
                    name: "地球",
                    icon: "el-icon-paperclip",
                    url: "/world",
                    children: []
                } 
            ]
        },
        {
            name: "图片上传",
            id: 11,
            icon: "el-icon-monitor",
            url: "/upload",
            children: []
        },
        {
            name: "Table",
            id: 12,
            icon: "el-icon-s-grid",
            url: "/table",
            children: []
        },
        {
            name: "calendar",
            id: 13,
            icon: "el-icon-date",
            url: "/calendar",
            children: []
        },
        {
            name: "粒子特效",
            id: 14,
            icon: "el-icon-star-on",
            url: "/paricla",
            children: []
        },
        {
            name: "可拖拽看板",
            id: 15,
            icon: "el-icon-s-grid",
            url: "/kanBan",
            children: []
        },
        {
            name: "个人中心",
            id: 16,
            icon: "el-icon-user-solid",
            url: "/user",
            children: []
        },
        {
            name: "登录注册",
            id: 17,
            icon: "el-icon-thumb",
            url: "/login&regiest",
            children: []
        }
    ]
    return List;
}

export function fetchItem() {
    let items = [
        { icon: 'peoples', title: 'Peoples', number: '10123' },
        { icon: 'wechat', title: 'Wechat', number: '111400' },
        { icon: 'star', title: 'Stars', number: '100000.3' },
        { icon: 'skill', title: 'Skills', number: '103100' }
    ]
    return items;
}

export function fetchOption() {
    let serieData = {
        good: {
            peoples: [75, 13, 56, 134, 42, 78, 180],
            wechat: [65, 3, 36, 94, 22, 58, 160],
            star: [75, 13, 56, 134, 42, 78, 180],
            skill: [75, 13, 56, 134, 42, 78, 180]
        },
        bad: {
            peoples: [180, 75, 13, 56, 134, 42, 78],
            wechat: [180, 75, 13, 56, 134, 42, 78],
            star: [180, 75, 13, 56, 134, 42, 78],
            skill: [180, 75, 13, 56, 134, 42, 78]
        }
    }
    return serieData;
}

export function filterNumber(value) {
    if(!value) return '0';
    /*原来用的是Number(value).toFixed(0)，这样取整时有问题，例如0.51取整之后为1 */
    var intPart =  Number(value)|0; //获取整数部分
    var intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'); //将整数部分逢三一断

    var floatPart = ".00"; //预定义小数部分
    var value2Array = value.split(".");

    //=2表示数据有小数位
    if(value2Array.length == 2) {
        floatPart = value2Array[1].toString(); //拿到小数部分

        if(floatPart.length == 1) { //补0,实际上用不着
            return intPartFormat + "." + floatPart + '0';
        } else {
            return intPartFormat + "." + floatPart;
        }

    } else {
        return intPartFormat + floatPart;
    }

}

export function fetchOptionBr(){
    let option = {
        title: {
            text: '浏览器占比变化',
            subtext: '纯属虚构',
            top: 10,
            left: 10
        },
        tooltip: {
            trigger: 'item',
            backgroundColor : 'rgba(0,0,250,0.2)'
        },
        legend: {
            type: 'scroll',
            bottom: 10,
            data: (function (){
                var list = [];
                for (var i = 1; i <=28; i++) {
                    list.push(i + 2000 + '');
                }
                return list;
            })()
        },
        visualMap: {
            top: 'middle',
            right: 10,
            color: ['red', 'yellow'],
            calculable: true
        },
        radar: {
            indicator : [
                { text: 'IE8-', max: 400},
                { text: 'IE9+', max: 400},
                { text: 'Safari', max: 400},
                { text: 'Firefox', max: 400},
                { text: 'Chrome', max: 400}
            ]
        },
        series : (function (){
            var series = [];
            for (var i = 1; i <= 28; i++) {
                series.push({
                    name:'浏览器（数据纯属虚构）',
                    type: 'radar',
                    symbol: 'none',
                    lineStyle: {
                        width: 1
                    },
                    emphasis: {
                        areaStyle: {
                            color: 'rgba(0,250,0,0.3)'
                        }
                    },
                    data:[
                        {
                            value:[
                                (40 - i) * 10,
                                (38 - i) * 4 + 60,
                                i * 5 + 10,
                                i * 9,
                                i * i /2
                            ],
                            name: i + 2000 + ''
                        }
                    ]
                });
            }
            return series;
        })()
    }; 

    return option;
}

export function fetchOptionRose(){
    let option = {
        title : {
            text: '南丁格尔玫瑰图',
            subtext: '纯属虚构',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            x : 'center',
            y : 'bottom',
            data:['rose1','rose2','rose3','rose4','rose5','rose6','rose7','rose8']
        },
        toolbox: {
            show : true,
            feature : {
                // mark : {show: true},
                // dataView : {show: true, readOnly: false},
                // magicType : {
                //     show: true,
                //     type: ['pie', 'funnel']
                // },
                // restore : {show: true},
                // saveAsImage : {show: true}
            }
        },
        calculable : true,
        series : [
            {
                name:'半径模式',
                type:'pie',
                radius : [20, 110],
                // center : ['25%', '50%'],
                roseType : 'radius',
                label: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: true
                    }
                },
                lableLine: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: true
                    }
                },
                data:[
                    {value:10, name:'rose1'},
                    {value:5, name:'rose2'},
                    {value:15, name:'rose3'},
                    {value:25, name:'rose4'},
                    {value:20, name:'rose5'},
                    {value:35, name:'rose6'},
                    {value:30, name:'rose7'},
                    {value:40, name:'rose8'}
                ]
            }
        ]
    };
    return option;
}

export function fetchOptionAxe () {
    var colors = ['#5793f3', '#d14a61', '#675bba'];
    let option = {
        color: colors,
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                // label: {
                //     backgroundColor: '#1E98D3' // 
                // }
            }
        },
        grid: {
            right: '28%'
        },
        toolbox: {
            // feature: {
            //     dataView: {show: true, readOnly: false},
            //     restore: {show: true},
            //     saveAsImage: {show: true}
            // }
        },
        legend: {
            data:['蒸发量','降水量','平均温度']
        },
        xAxis: [
            {
                type: 'category',
                axisTick: {
                    alignWithLabel: true
                },
                data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
                axisLabel : {
                    formatter: '{value}',
                    textStyle: { //改变刻度字体样式
                        color: '#1E98D3'
                    }
                },
                axisPointer: {
                    label: {
                        backgroundColor: '#1E98D3' // 鼠标移入的时候，轴上文字的背景色
                    }
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '蒸发量',
                min: 0,
                max: 250,
                position: 'right',
                axisLine: {
                    lineStyle: {
                        color: colors[0]
                    }
                },
                axisLabel: {
                    formatter: '{value} ml'
                }
            },
            {
                type: 'value',
                name: '降水量',
                min: 0,
                max: 250,
                position: 'right',
                offset: 80,
                axisLine: {
                    lineStyle: {
                        color: colors[1]
                    }
                },
                axisLabel: {
                    formatter: '{value} ml'
                }
            },
            {
                type: 'value',
                name: '温度',
                min: 0,
                max: 25,
                position: 'left',
                axisLine: {
                    lineStyle: {
                        color: colors[2]
                    }
                },
                axisLabel: {
                    formatter: '{value} °C'
                }
            }
        ],
        series: [
            {
                name:'蒸发量',
                type:'bar',
                data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
            },
            {
                name:'降水量',
                type:'bar',
                yAxisIndex: 1,
                data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
            },
            {
                name:'平均温度',
                type:'line',
                yAxisIndex: 2,
                data:[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
            }
        ]
    };
    return option;
}

export function fetchOptionKey(){
    var xAxisData = [];
    var data1 = [];
    var data2 = [];
    for (var i = 0; i < 30; i++) {
        xAxisData.push(i);
        data1.push((Math.sin(i / 5) * (i / 5 -10) + i / 6) * 5);
        data2.push((Math.cos(i / 5) * (i / 5 -11) + i / 6) * 5);
    }
    let option = {
        title: {
            text: '柱状图动画延迟'
        },
        legend: {
            data: ['bar', 'bar2'],
            align: 'left'
        },
        tooltip: {},
        grid: {
            left: '3%',
            right: '3%',
            bottom: '4%',
            containLabel: true
        },
        visualMap: {
            show: false,
            min: 0,
            max: 50,
            dimension: 0,
            inRange: {
                color: ['#4a657a', '#308e92', '#b1cfa5', '#f5d69f', '#f5898b', '#ef5055']
            }
        },
        xAxis: {
            data: xAxisData,
            silent: false,
            splitLine: {
                show: false
            }
        },
        yAxis: {
        },
        series: [{
            name: 'bar',
            type: 'bar',
            data: data1,
            animationDelay: function (idx) {
                return idx * 20;
            }
        }, {
            name: 'bar2',
            type: 'bar',
            data: data2,
            animationDelay: function (idx) {
                return idx * 10 + 100;
            }
        }],
        animationEasing: 'elasticOut',
        animationDelayUpdate: function (idx) {
            return idx * 5;
        }
    };
    return option;
}




