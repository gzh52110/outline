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
        <van-goods-action>
            <van-goods-action-icon icon="chat-o" text="客服" color="#ee0a24" />
            <van-goods-action-icon icon="cart-o" text="购物车" />
            <van-goods-action-icon icon="star" text="已收藏" color="#ff5000" />
            <van-goods-action-button type="warning" text="加入购物车" />
            <van-goods-action-button type="danger" text="立即购买" />
        </van-goods-action>
    </div>
</template>
<script>
export default {
  name: "Goods",
  data() {
    return {
      data: {}
    };
  },
  created() {
    const { id } = this.$route.params;
    this.getData(id);

    // 隐藏tabbar
    console.log("Goods", this);
    this.$parent.showMenu = false;
  },
  destroyed() {
    this.$parent.showMenu = true;
  },
  methods: {
    async getData(id) {
      const { data } = await this.$request("/goods/" + id);

      this.data = data.data;
    }
  }
};
</script>
<style>
h1 {
  font-size: 18px;
}
</style>

