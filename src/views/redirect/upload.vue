<!-- upload -->
<template>
    <div class="form-group">
        <div class="control-form">
            <p class="help-block">上传图片(建议图片格式为：JPEG/BMP/PNG/GIF，大小不超过5M，最多可上传4张)</p>
            <ul class="upload-imgs">
                <li v-if="imgLen>=4 ? false : true">
                    <input type="file" class="upload" @change="addImg" ref="inputer" multiple accept="image/png,image/jpeg,image/gif,image/jpg"/>
                    <a class="add"><i class="iconfont icon-plus"></i></a>
                </li>
                <li v-for="(value, key) in imgs" :key="key">
                    <p class="img"><img :src="getObjectURL(value)"><a class="close" @click="delImg(key)">×</a></p>
                </li>
            </ul>
            <el-button type="primary btn-sub" @click="submit()">上传</el-button>
        </div>

        <div class="upload-box">
            <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="fileList"
                :before-upload="beforeAvatarUpload"
                list-type="picture">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
        </div>
        <div class="pre-box" @click="gone()" v-show="srcBoolean" ref="preBox">
            <img :src="SRC" alt="">
        </div>
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
export default {
    //import引入的组件需要注入到对象中才能使用
    components: {NProgress},
    data() {
        //这里存放数据
        return {
            formData: new FormData(),
            imgs: {},
            imgLen: 0,
            SRC:"",
            srcBoolean: true,
            srcImg: {
                width:'',
                height:''
            },
            imgQuality: 0.5,
            fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
        };
    },
    //监听属性 类似于data概念
    computed: {

    },
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        addImg(event){
            let inputDOM = this.$refs.inputer;
            // 通过DOM取文件数据
            this.fil = inputDOM.files;
            let oldLen = this.imgLen;
            let len = this.fil.length+oldLen;
            if(len > 4){
                alert('最多可上传4张，您还可以上传'+(4-oldLen)+'张');
                return false;
            }
            for (let i=0; i < this.fil.length; i++) {
                let size = Math.floor(this.fil[i].size / 1024);
                if (size > 5*1024*1024) {
                    alert('请选择5M以内的图片！');
                    return false;
                }
                this.imgLen++;
                this.$set(this.imgs, this.fil[i].name+'?'+new Date().getTime()+i, this.fil[i]);
            }
        },
        getObjectURL(file) {
            var url = null ;
            if (window.createObjectURL!=undefined) { // basic
                url = window.createObjectURL(file) ;
            } else if (window.URL!=undefined) { // mozilla(firefox)
                url = window.URL.createObjectURL(file) ;
            } else if (window.webkitURL!=undefined) { // webkit or chrome
                url = window.webkitURL.createObjectURL(file) ;
            }
            return url ;
        },
        delImg(key){
            this.$delete(this.imgs,key);
            this.imgLen--;
        },
        submit(){
            var that = this
            for(let key in that.imgs){
                let name = key.split('?')[0];
                that.formData.append('multipartFiles', that.imgs[key], name);
            }
            // that.$http.post('/opinion/feedback', that.formData,{
            //     headers: {'Content-Type': 'multipart/form-data'}
            // }).then(res => {
            //     that.alertShow=true;
            // });
        },

        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            var that = this;
            that.srcBoolean = true
            let img = new Image();
            img.src = file.url;
            img.onload = function(){
                that.srcImg.width = img.width
                that.srcImg.height = img.height
                
            }
            that.$refs.preBox.height = 300 * that.srcImg.height / that.srcImg.width + 'px';
            that.SRC = file.url
        },

        dataURItoBlob(dataURI, type) {
            var binary = atob(dataURI.split(',')[1]);
            var array = [];
            for(var i = 0; i < binary.length; i++) {
                array.push(binary.charCodeAt(i));
            }
            return new Blob([new Uint8Array(array)], {type: type});
        },
        beforeAvatarUpload(file) {
            const _this = this
            return new Promise(resolve => {
                const reader = new FileReader()
                const image = new Image()
                image.onload = (imageEvent) => {
                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');
                    const width = image.width * _this.imgQuality
                    const height = image.height * _this.imgQuality
                    canvas.width = width;
                    canvas.height = height;
                    context.clearRect(0, 0, width, height);
                    context.drawImage(image, 0, 0, width, height);
                    const dataUrl = canvas.toDataURL(file.type);
                    const blobData = _this.dataURItoBlob(dataUrl, file.type);
                    resolve(blobData)
                }
                reader.onload = (e => { image.src = e.target.result; });
                reader.readAsDataURL(file);
            })
        },
        gone(){
            this.srcBoolean = false
        }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {

    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        NProgress.done();
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
.container, .form-group {
    width: 100%;
    height: 100%;

    .control-form {
        width: 670px;
        height: 40%;
        margin: 10px auto;
    }
    .upload-imgs{
        margin: 10px 0 30px 0;
        overflow: hidden;
        font-size: 0;
    }
    .upload-imgs li{
        position: relative;
        width: 118px;
        height: 118px;
        font-size: 14px;
        display: inline-block;
        padding: 10px;
        margin-right: 25px;
        border: 2px dashed #ccc;
        text-align: center;
        vertical-align: middle;
    }
    .upload-imgs li:hover{
        // border-color: $them-color;
    }
    .upload-imgs .add{
        display: block;
        background-color: #ccc;
        color: #ffffff;
        height: 94px;
        padding: 8px 0;
    }
    .upload-imgs .add .iconfont{
        padding: 10px 0;
        font-size: 40px;
    }
    .upload-imgs li:hover .add{
        // background-color: $them-color;
    }
    .upload-imgs li .upload{
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        width: 70px;
        height: 23px;
        margin: auto;
    }
    .upload-imgs .img{
        position: relative;
        width: 94px;
        height: 94px;
        line-height: 94px;
    }
    .upload-imgs .img img{
        width: 118px;
        height: 118px;
        vertical-align: middle;
    }
    .upload-imgs .img .close{
        display: none;
    }
    .upload-imgs li:hover .img .close{
        display: block;
        position: absolute;
        right: -6px;
        top: -10px;
        line-height: 1;
        font-size: 22px;
        color: #aaa;
    }
    .btn-sub {
        display: block;
        margin: 0 auto;
    }
    .upload-box {
        width: 670px;
        height: 420px;
        overflow-y: auto;
        margin: 0 auto;
    }
    .pre-box {
        width: 300px;
        position: fixed;
        left: 390px;
        top: 500px;

        img {
            width: 100%;
            height: 100%;
        }
    }
}
</style>