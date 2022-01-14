<template>
    <div>
        <!-- 搜索 -->
        <van-search disabled placeholder="请输入搜索关键词" @click="$router.push('/search')" />
        
        <van-row type="flex" justify="space-around">
            <van-col style="width:80px">
                <van-sidebar v-model="activeKey" @change="changeMenu">
                    <van-sidebar-item v-for="item in categories" :key="item._id" :title="item.text" />
                </van-sidebar>
            </van-col>
            <van-col style="flex:1;padding:10px">
                <!-- <van-row gutter="20">
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
                </van-row> -->
                <!-- <router-view name="filter"></router-view> -->
                <transition name="slide-left">
                    <router-view></router-view>
                </transition>
            </van-col>
        </van-row>
        
    </div>
</template>
<script>
export default {
    name:'Discover',
    data(){
        return {
            activeKey:0,
            categories:[],
            goodslist:[]
        }
    },
    created(){
        
        console.log('created',this)
        
        this.$request.get('/category').then(({data})=>{
            this.categories = data.data.result;
            this.getData()

            // 高亮处理
            const {path} = this.$route;// /discover/man
            const index = this.categories.findIndex((item)=>{
                return path.includes(item.name)
            });
            console.log('index',path,index);
            this.activeKey = index;
        })
    },
    methods:{
        changeMenu(index){
            this.activeKey = index;
            const currentCategory = this.categories[index]

            // this.getData();
            console.log('current',currentCategory)

            this.$router.push('/discover/'+currentCategory.name)
        },
        getData(){
            const currentCategory = this.categories[this.activeKey]
            this.$request.get('/goods',{
                params:{
                    category:currentCategory.text
                }
            }).then(({data})=>{
                this.goodslist = data.data.result;
            })  
        }
    }
}
</script>
<style lang="scss">
    /*
        进场动画 
        * v-enter
        * v-enter-active
        * v-enter-to
    */

    // // 动画初始状态
    // .v-enter {
    //     transform: translate(-100%, 0);
    // }
    // .v-enter-active{
    //     // position: absolute;left:0;top:0;right:0;bottom:0;
    //     transition: transform 0.3s ease-in-out;
    // }
    // // 动画目标状态
    // .v-enter-to {
    //     transform: translate(0, 0);
    // }

    .slide-enter {
        transform: translate(-100%, 0);
    }
    .slide-enter-active{
        // position: absolute;left:0;top:0;right:0;bottom:0;
        transition: transform 0.3s ease-in-out;
    }
    // 动画目标状态
    .slide-enter-to {
        transform: translate(0, 0);
    }

    /* 右入动画 */
    .slide-left-enter {
        transform: translate(100%, 0);
    }
    .slide-left-enter-active{
        transition: transform 0.3s ease-in-out;
    }
    .slide-left-enter-to {
        transform: translate(0, 0);
    }

</style>

