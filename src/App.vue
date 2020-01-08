<template>
    <div id="app">
        <Banner :bannerTitle="content"/>
        <router-view :style="conheight"/>
    </div>
</template>

<script>
import Banner from "@/components/Banner.vue";
export default {
    name: "App",
    components: {
        Banner
    },
    data(){
        return {
            content:'生命中有三件必经之事',
            conheight:{
                height:''
            }
        }
    },
    methods: {
        getHeight(){
            this.conheight.height = window.innerHeight-80+'px';
        }
    },
    created () {
        window.addEventListener('resize', this.getHeight);
        this.getHeight()
    }
}
</script>

<style lang="less">
html, body {
    height: 100%;
    width: 100%;
}
#app {
    height: 100%;
    width: 100%;
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
.clearfix:after{
    content: "";
    width: 0;
    height: 0;
    display: block;
    overflow: hidden;
    clear: both;
}
.clearfix{
    zoom: 1;
}


/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/  
::-webkit-scrollbar  
{  
    width: 5px;  
    height: 110px;  
    background-color: rgb(10, 245, 245);  
}  
/*定义滚动条轨道 内阴影+圆角*/  
::-webkit-scrollbar-track  
{  
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);  
    border-radius: 10px;  
    background-color: #F5F5F5;  
}    
/*定义滑块 内阴影+圆角*/  
::-webkit-scrollbar-thumb  
{  
    border-radius: 10px;  
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);  
    background-color: #bdbdbd;  
}  
/*滑块效果*/
::-webkit-scrollbar-thumb:hover
{
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: rgba(0,0,0,0.4);
}
</style>
