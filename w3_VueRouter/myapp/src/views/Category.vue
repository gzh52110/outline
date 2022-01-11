<template>
    <div style="padding-top:46px;">
        <van-nav-bar
            :title="cat"
            left-text="返回"
            left-arrow
            @click-left="$router.back()"
            fixed
        />
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="--------我是有底线的--------"
            @load="loadMore"
        >
        <van-cell v-for="item in datalist" :key="item._id" :title="item.goods_name" is-link @click="$router.push('/goods/'+item._id)">
            <template v-slot:icon>
                <van-image
                    fit="cover"
                    width="80"
                    height="80"
                    :src="$host + item.img_url"
                    lazy-load
                >
                    <template v-slot:loading>
                        <van-loading type="spinner" size="20" />
                    </template>
                </van-image>
            </template>
            <template #title>
                <h5 style="margin:0" class="van-multi-ellipsis--l2">{{item.goods_name}}</h5>
            </template>
            <template #label>
                <p class="price">
                        <del>{{item.price}}</del>
                        <span>{{item.sales_price}}</span>
                    </p>
            </template>
        </van-cell>
        </van-list>
    </div>
</template>
<script>
export default {
  name: "Category",
  data() {
    return {
      cat: "",
      datalist: [],
      total: 0,
      loading: false,
      finished: false,
      page:1
    };
  },
  created() {
    const { cat } = this.$route.query;
    this.cat = cat;
  },
  methods: {
    loadMore() {
      console.log("loadmore");
      this.getData();
    },
    getData() {
      this.loading = true;
      this.$request
        .get("/goods", {
          params: {
            category: this.cat,
            page:this.page
          }
        })
        .then(({ data }) => {
          this.datalist = [...this.datalist, ...data.data.result];
          this.total = data.data.total;

          this.loading = false;

          // 是否加载完成
          this.finished = this.datalist.length == this.total;

          this.page++;
        });
    }
  }
};
</script>
<style>
</style>

