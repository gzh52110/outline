<template>
    <div>
        <van-sticky>
            <!-- 搜索 -->
            <van-search v-model="keyword"  placeholder="请输入搜索关键词" @search="search" />
        </van-sticky>
            <p v-if="total>0">搜索{{keyword}}的结果{{total}}条</p>
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="--------我是有底线的--------"
            @load="loadMore"
        >
        <van-cell v-for="item in result" :key="item._id" :title="item.goods_name" is-link @click="$router.push('/goods/'+item._id)">
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
  name: "Search",
  data() {
    return {
      keyword: "",
      result: [],
      total: 0,
      loading: false,
      finished: false,
      page: 1
    };
  },
  mounted() {
    const { keyword } = this.$route.query;

    if (keyword) {
      this.keyword = keyword;
    }
  },
  created(){
      console.log('Search.created')
  },
  destroyed(){
      console.log('Search.destroyed')
  },
  activated(){
      console.log('Search.activated')
  },
  deactivated(){
      console.log('Search.deactivated')
  },
  methods: {
      search(){
          // 重置表单
          this.result=[],
          this.total=0,
          this.loading=false,
          this.finished=false,
          this.page=1
          this.getData()
      },
    loadMore() {
      this.getData();
    },
    getData() {
      this.loading = true;
      this.$request
        .get("/search", {
          params: {
            keyword: this.keyword,
            page: this.page
          }
        })
        .then(({ data }) => {
          this.result = [...this.result, ...data.data.result];
          this.total = data.data.total;

          this.loading = false;

          // 是否加载完成
          this.finished = this.result.length == this.total;

          this.page++;
        });
    }
  }
};
</script>
<style>
</style>

