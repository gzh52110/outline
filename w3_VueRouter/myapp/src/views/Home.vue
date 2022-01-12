<template>
    <div>
        <!-- 搜索 -->
        <van-search v-model="keyword" disabled placeholder="请输入搜索关键词" @click="$router.push('/search?keyword='+keyword)" />
        <!-- 轮播图 -->
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="item in hotlist" :key="item._id">
                <van-image
                    fit="cover"
                    width="100%"
                    height="100"
                    :src="$host + item.img_url"
                    @click="goto(item._id)"
                />
            </van-swipe-item>
        </van-swipe>
        <!-- 分类 -->
        <van-grid :column-num="3">
            <van-grid-item icon="photo-o" :text="item.text" v-for="item in categories" :key="item._id" @click="$router.push('/list?cat='+item.text)" />
        </van-grid>

        <!-- 最新商品列表 -->
        <div class="goodslist">
            <h4>最新商品</h4>
            <van-row gutter="20">
                <van-col span="12" v-for="item in newlist" :key="item._id">
                    <van-image
                        fit="cover"
                        width="100%"
                        height="100"
                        :src="$host + item.img_url"
                        @click="goto(item._id)"
                        lazy-load
                    >
                        <template v-slot:loading>
                            <van-loading type="spinner" size="20" />
                        </template>
                    </van-image>
                    <h5 class="van-multi-ellipsis--l3">{{item.goods_name}}</h5>
                    <p class="price">
                        <del>{{item.price}}</del>
                        <span>{{item.sales_price}}</span>
                    </p>
                </van-col>
            </van-row>

        </div>
        <!-- 热门商品列表 -->
    </div>
</template>
<script>
export default {
    name:'Home',
    data(){
        return {
            keyword:'百达翡丽',
            hotlist:[],
            newlist:[],
            categories:[]
        }
    },
    created(){
        
        // 热门商品（轮播图）
        this.$request.get('/goods',{
            params:{
                sort:'views',
                size:5
            }
        }).then(({data})=>{
            this.hotlist = data.data.result;
        })

        // 最新商品（商品列表）
        this.$request.get('/goods',{
            params:{
                size:6
            }
        }).then(({data})=>{
            this.newlist = data.data.result;
        })


        // 分类
        this.$request.get('/category',{
            params:{
                size:6
            }
        }).then(({data})=>{
            this.categories = data.data.result;
        })
        
    },
    methods:{
        async getData(){
            await this.$request.get('/goods',{
                params:{
                    sort:'views',
                    size:5
                }
            })
        },
        goto(id){
            // this.$router.push(path)

            // this.$router.push({
            //     path:'/goods',
            //     query:{id},
            // })

            // params方式给动态路由传参，只支持name方式跳转
            this.$router.push({
                name:'Goods',
                params:{id},
            })

            // this.$router.push({
            //     path:'/goods/'+id
            // })

            // 以上两种写法等效
        }
    },

    beforeRouteEnter(to,from,next){
      console.log('Home.beforeRouteEnter')
      next();
    },
    beforeRouteLeave(to,from,next){
        console.log('Home.beforeRouteLeave')
        next();
    },
}
</script>
<style>
.goodslist{
    padding:15px;
}
</style>

