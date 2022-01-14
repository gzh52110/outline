<template>
    <div>
        <van-nav-bar
            :title="data.goods_name"
            left-text="返回"
            left-arrow
            fixed
        >
            <template #left>
                <van-icon name="arrow-left" size="20" style="margin-right:10px" @click="$router.back()" />
                <van-icon name="wap-home-o" size="20" @click="$router.push('/home')" />
            </template>

            <template #right>
                <van-icon name="share-o" size="20" />
            </template>
        </van-nav-bar>
        <main>
            <van-image
                fit="cover"
                width="100%"
                :src="$host + data.img_url"
                lazy-load
            >
                <template v-slot:loading>
                    <van-loading type="spinner" size="20" />
                </template>
            </van-image>
            <h1>{{data.goods_name}}</h1>
             <p class="price">
                <del>{{data.price}}</del>
                <span>{{data.sales_price}}</span>
            </p>
        </main>
        <div class="goodslist">
            <h4>{{data.category}}相关商品</h4>
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
        <van-goods-action>
            <van-goods-action-icon icon="chat-o" text="客服" color="#ee0a24" />
            <van-goods-action-icon icon="cart-o" text="购物车" to="/cart" :badge="cartlist.length" />
            <van-goods-action-icon icon="star" text="已收藏" color="#ff5000" />
            <van-goods-action-button type="warning" text="加入购物车" @click="add2cart" />
            <van-goods-action-button type="danger" text="立即购买" @click="buyNow" />
        </van-goods-action>
    </div>
</template>
<script>
export default {
  name: "Goods",
  data() {
    return {
      data: {},
      goodslist: [],
      // cartlist: [], // 购物车数据
    };
  },
  computed:{
    cartlist(){
      // return this.$store.state.cartlist
      return this.$store.state.cart.cartlist
    }
  },
  // 监听路由变化
  watch: {
    //   '$route.params.id':function(n,o){
    //       console.log(n,o);
    //       this.getData(n);
    //   },
    // 监听category变化：只有在category发生变化时才发起请求
    "data.category": function() {
      this.getList();
    }
  },
  created() {
    const { id } = this.$route.params;
    this.getData(id);

    // 隐藏tabbar
    // console.log("Goods.created", this);
    this.$parent.showMenu = false;

    // 获取本地存储中的购物车数据
    // let cartlist = localStorage.getItem("cartlist");
    // try {
    //   cartlist = JSON.parse(cartlist) || [];
    // } catch (err) {
    //   cartlist = [];
    // }

    // this.cartlist = cartlist;
  },
  destroyed() {
    //   console.log('Goods.destroyed')
    this.$parent.showMenu = true;
  },
  activated() {
    const { id } = this.$route.params;
    this.getData(id);
    this.$parent.showMenu = false;
  },
  deactivated() {
    this.$parent.showMenu = true;
  },
  // 组件内路由守卫
  beforeRouteUpdate(to, from, next) {
    // to: 目标地址（想去哪里），属性与$route一致
    // from: 来源地址（从哪来），属性与$route一致
    // next(): 放行
    //   console.log('Goods.beforeRouteUpdate')
    this.getData(to.params.id);

    next();
    //    console.log('next()',this.$route.params.id)
  },
  beforeRouteEnter(to, from, next) {
    //   console.log('Goods.beforeRouteEnter',this)
    // 只允许从首页进入
    //   if(from.path === '/home')
    next();
  },
  beforeRouteLeave(to, from, next) {
    //   console.log('Goods.beforeRouteLeave')
    next();
  },
  methods: {
    async getData(id) {
      const { data } = await this.$request("/goods/" + id);

      this.data = data.data;
    },
    async getList() {
      // 获取同类商品
      const { data } = await this.$request.get("/goods", {
        params: {
          category: this.data.category,
          size: 6
        }
      });
      this.goodslist = data.data.result;
    },
    add2cart() {
        // 判断当前商品是否已经添加到购物车
        // 是：数量+1
        // 否：添加
        const {_id,goods_name,price,sales_price,img_url} = this.data;
        const current = this.cartlist.find((item)=>item._id === _id)

        if(current){
            // current.qty++;
            // this.$store.commit('changeGoodsQty',{id:_id,qty:current.qty+1})
            this.$store.commit('cart/changeGoodsQty',{id:_id,qty:current.qty+1})
        }else{
            const newGoods = {
                _id,
                goods_name,
                price,
                sales_price,
                img_url,
                qty:1
            }

            // this.cartlist.unshift(newGoods)
            // this.$store.commit('addToCart',newGoods)
            this.$store.commit('cart/addToCart',newGoods)
        }

        

        this.$toast('添加成功')

    },
    buyNow(){
        this.add2cart()
        this.$router.push('/cart')
    }
  }
};
</script>
<style>
h1 {
  font-size: 18px;
}
</style>

