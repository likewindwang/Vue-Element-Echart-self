<!--
 * @Author: Mr.Wang
 * @Date: 2020-01-14 15:24:30
 * @LastEditTime : 2020-01-14 16:13:34
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \practice\src\views\redirect\love.vue
-->
<!-- lovetree -->
<template>
    <div class="container">
        <div id="main">
            <div id="error">本页面采用HTML5编辑，目前您的浏览器无法显示，请换成谷歌浏览器，或者其他游览器的最新版本。</div>
            <div id="wrap">
                <div id="text">
                    <div id="code">
                        <font color="#FF0000">
                            <span class="say">亲爱的，我爱你，虽然你看不见我对你的告白</span><br>
                            <span class="say"> </span><br>
                            <span class="say"> 我知道我不会甜言蜜语，但是我会用行动证明一切</span><br>
                            <span class="say"> </span><br>
                            <span class="say">你说我啰嗦，有些东西因为越在乎所以越失去</span><br>
                            <span class="say"> </span><br>
                            <span class="say">因为我太爱你了，所以我失去你了</span><br>
                            <span class="say"> </span><br>
                            <span class="say">因为我太啰嗦了，所以你离开了我</span><br>
                            <span class="say"> </span><br>
                            <span class="say">虽然你看不见我的告白，但是我还是要把这些心里话说</span><br>
                            <span class="say"> </span><br>
                            <span class="say">虽然你看不见我的告白，但是我还是要把这些心里话说</span><br>
                            <span class="say"> </span><br>
                            <span class="say">虽然你看不见我的告白，但是我还是要把这些心里话说</span><br>
                            <span class="say"> </span><br>
                            <span class="say">虽然你看不见我的告白，但是我还是要把这些心里话说</span><br>
                            <span class="say"> </span><br>
                            <span class="say"> -- 爱你的午夜阳光--</span>
                        </font>
                    </div>
                </div>
                <div id="clock-box">
                    <span><font color="#666666">亲爱的，我们相识已经是</font></span>
                    <div id="clock"></div>
                </div>
                <canvas id="canvas" width="1100" height="680"></canvas>
            </div>
        </div>
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
        (function(){
            var canvas = $('#canvas');
            if (!canvas[0].getContext) {
                $("#error").show();
                return false;
            }
            var width = canvas.width();
            var height = canvas.height();
            canvas.attr("width", width);
            canvas.attr("height", height);
            var opts = {
                seed: {
                    x: width / 2 - 20,
                    color: "rgb(190, 26, 37)",
                    scale: 2,
                },
                branch: [
                    [
                        535,680,570,250,500,200,30,100,
                        [
                            [540,500,455,417,340,400,13,100,[[450,435,434,430,394,395,2,40]]],
                            [550,445,600,356,680,345,12,100,[[578,400,648,409,661,426,3,80]]],
                            [539,281,537,248,534,217,3,40],
                            [546,397,413,247,328,244,9,80,[[427,286,383,253,371,205,2,40],[498,345,435,315,395,330,4,60]]],
                            [546,357,608,252,678,221,6,100,[[590,293,646,277,648,271,2,80]]]
                        ]
                    ]
                ],
                bloom: {
                    num: 700,
                    width:1080,
                    height:650,
                },
                footer:{width:1200,height:5,speed:10,},
            };
            var tree = new Tree(canvas[0], width, height, opts);
            var seed = tree.seed;
            var foot = tree.footer;
            var hold = 1;canvas.click(function(e) { 
                var audioHtml = '<audio id="myaudio" src="../../../public/renxi.mp3" controls="controls" autoplay loop="true" hidden="true"></audio>';  $('body').append(audioHtml);
                function IsPC() {
                    var userAgentInfo = navigator.userAgent;
                    var Agents = ["Android", "iPhone","SymbianOS", "Windows Phone","iPad", "iPod"];
                    var flag = true;
                    for (var v = 0; v < Agents.length; v++) {
                        if (userAgentInfo.indexOf(Agents[v]) > 0) {
                            flag = false;
                            break;
                        }
                    }
                    return flag;
                };
                if(IsPC() === false){
                    var _palyer = document.getElementById('myaudio');
                    function initAutoPlay () {
                    _player.play();
                    document.removeEventListener('touchstart', initAutoPlay, false);
                    }
                    function playAudio () {
                    _player.play();
                    }
                    document.addEventListener('touchstart', initAutoPlay, false); // 解决部分浏览器禁止自动播放问题
                    document.addEventListener('WeixinJSBridgeReady', playAudio, false); // 解决微信浏览器
                };
                var offset = canvas.offset(), x, y;
                x = e.pageX - offset.left;
                y = e.pageY - offset.top;
                if (seed.hover(x, y)) {
                    hold = 0; 
                    canvas.unbind("click");
                    canvas.unbind("mousemove");
                    canvas.removeClass('hand');
                }
            }).mousemove(function(e){
                var offset = canvas.offset(), x, y;
                x = e.pageX - offset.left;
                y = e.pageY - offset.top;canvas.toggleClass('hand', seed.hover(x, y));
            });
            var seedAnimate = eval(Jscex.compile("async", function () {
                seed.draw();while (hold) {
                    $await(Jscex.Async.sleep(10));
                }while (seed.canScale()) {
                    seed.scale(0.95);$await(Jscex.Async.sleep(10));
                }while (seed.canMove()) {
                    seed.move(0, 2);foot.draw();
                    $await(Jscex.Async.sleep(10));
                }
            }));
            var growAnimate = eval(Jscex.compile("async", function () {
                do {
                    tree.grow();
                    $await(Jscex.Async.sleep(10));
                } while (tree.canGrow());
            }));
            var flowAnimate = eval(Jscex.compile("async", function () {
                do {
                    tree.flower(2);
                    $await(Jscex.Async.sleep(10));
                } while (tree.canFlower());
            }));
            var moveAnimate = eval(Jscex.compile("async", function () {
                tree.snapshot("p1", 240, 0, 610, 680);
                while (tree.move("p1", 500, 0)) {
                    foot.draw();
                    $await(Jscex.Async.sleep(10));
                }foot.draw();
                tree.snapshot("p2", 500, 0, 610, 680);
                canvas.parent().css("background", "url(" + tree.toDataURL('image/png') + ")");
                canvas.css("background", "rgba(255, 255, 238, .4)");
                $await(Jscex.Async.sleep(300));
                canvas.css("background", "none");
            }));
            var jumpAnimate = eval(Jscex.compile("async", function () {
                var ctx = tree.ctx;while (true) {
                    tree.ctx.clearRect(0, 0, width, height);
                    tree.jump();
                    foot.draw();
                    $await(Jscex.Async.sleep(25));
                }
            }));
            var textAnimate = eval(Jscex.compile("async", function () {
                var together = new Date();
                together.setFullYear(2020,(1-1),(1-1));
                together.setHours(9);
                together.setMinutes(30);
                together.setSeconds(0);
                together.setMilliseconds(0);
                $("#code").show().typewriter();
                $("#clock-box").fadeIn(500);
                while (true) {
                    timeElapse(together);
                    $await(Jscex.Async.sleep(1000));
                }
            }));
            var runAsync = eval(Jscex.compile("async", function () {
                $await(seedAnimate());
                $await(growAnimate());
                $await(flowAnimate());
                $await(moveAnimate());
                textAnimate().start();
                $await(jumpAnimate());
            }));
                runAsync().start();
        })();
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
@import url("../../../public/renxi/default.css");
.container {
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 238, .4);
}


</style>