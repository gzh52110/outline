<template>
    <div>
        <p class="tips">你访问的页面不存在</p>
        <div class="goodslist ad">
            <h4>推荐商品</h4>
            <van-row gutter="20">
                <van-col span="12" v-for="item in goodslist" :key="item._id">
                    <van-image
                        fit="cover"
                        width="100%"
                        height="100"
                        :src="$host + item.img_url"
                        @click="$router.push('/goods/'+item._id)"
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
    </div>
</template>
<script>
export default {
    name:'NotFound',
    data(){
        return {
            goodslist:[]
        }
    },
   created(){
        
        // 热门商品（轮播图）
        this.$request.get('/goods',{
            params:{
                sort:'views'
            }
        }).then(({data})=>{
            this.goodslist = data.data.result;
        })
    }
}
</script>
<style>
    .tips{
        padding:15px;font-size:12px;
        /* 高版本浏览器被弃用 */
        -webkit-text-size-adjust:none;
        transform: scale(0.8);
    }
</style>

