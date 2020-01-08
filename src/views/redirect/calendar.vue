<!-- calendar 日历 -->
<template>
    <div class="container">
        <el-calendar v-model="calendarVal"></el-calendar>
        
        <ele-calendars :render-content="renderContent" :data="datedef" :prop="prop" :lunarcalendar="lunarcalendar"></ele-calendars>
        
        <el-calendar>
        <template slot="dateCell" slot-scope="{ date, data }">
            <p style="white-space: pre-line;">
            {{ solarDate2lunar(data.day) }}
            </p>
        </template>
        </el-calendar>
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import eleCalendars from 'ele-calendar'
import 'ele-calendar/dist/vue-calendar.css'
import calendar from "@/assets/js/calendar.js";
export default {
  //import引入的组件需要注入到对象中才能使用
    components: { eleCalendars },
    data() {
    //这里存放数据
        return {
            calendarVal: new Date(),
            datedef:[
                {"date":"2018-06-30","content":null,"cid":null},
                {"date":"2018-06-26","content":null,"cid":null},
            ],
            prop:'date', //对应日期字段名
            lunarcalendar: true
        };
    },
  //监听属性 类似于data概念
    computed: {},
  //监控data中的数据变化
    watch: {},
  //方法集合
    methods: {
        renderContent(h,parmas) {
            const loop = data =>{
                return (
                    data.defvalue.value ? (<div><div>{data.defvalue.text}</div> 
                    <span >备选项</span>
                    </div>) : <div>{data.defvalue.text}</div>
                )
            }
            return (
                <div  style="min-height:60px;">{loop(parmas)}</div>
            );
        },
        solarDate2lunar(solarDate) {
            var solar = solarDate.split("-");
            var lunar = calendar.solar2lunar(solar[0], solar[1], solar[2]);
            return solar[1] + "-" + solar[2] + "\n" + lunar.IMonthCn + lunar.IDayCn;
        }
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
    padding: 20px 40px;
    box-sizing: border-box;


}
</style>