<template>
    <div>
        <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column type="selection"></el-table-column>
      <el-table-column label="#" type="index"></el-table-column>
      <el-table-column
        width="80"
        prop="img_url"
        label="图片"
        v-slot="{row}"
    >
        <el-image
        style="width: 60px; height: 60px"
        :src="$host + row.img_url"></el-image>
      </el-table-column>
      <el-table-column
        prop="goods_name"
        label="商品信息"
        v-slot="{row}"
        >
        <h5>{{row.goods_name}}</h5>
        <p class="price"><del>{{row.price}}</del><span>{{row.sales_price}}</span></p>
      </el-table-column>
      <el-table-column
        label="操作"
        width="180">
        <el-button type="primary" size="mini" icon="el-icon-edit-outline">编辑</el-button>
        <el-button type="danger" size="mini" icon="el-icon-delete
">删除</el-button>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="changeSize"
      @current-change="changePage"
      :current-page="page"
      :page-sizes="[5, 10, 15, 30, 50]"
      :page-size="size"
      layout="total, prev, pager, next, sizes"
      :total="total">
    </el-pagination>
    </div>
</template>
<script>
export default {
  name: "GoodsList",
  data() {
      // 获取地址栏数据，然后写入data
      const {page=1,size=10} = this.$route.query;
    return {
      tableData: [],
      page,
      size,
      total: 0
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const { data } = await this.$request.get("/goods", {
        params: {
          page: this.page,
          size: this.size
        }
      });

      const { result, total } = data.data;

      this.tableData = result;
      this.total = total;
    },
    changeSize(size){
        this.size = size;
        this.getData();
        // this.$route.query.size = size;
        this.$router.replace({
            // path:'/manage/goods/list',
            query:{...this.$route.query,size}
        })
    },
    changePage(page){
        this.page = page
        this.getData();
        this.$router.replace({
            // path:'/manage/goods/list',
            query:{...this.$route.query,page}
        })
    }
  }
};
</script>
