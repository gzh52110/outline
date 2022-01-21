<template>
    <div>
        <el-table
      :data="tableData"
      style="width: 100%"
      row-key="_id"
      @selection-change="select"
      >
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
        width="180"
        v-slot="{row}"
        >
        <el-button type="primary" size="mini" icon="el-icon-edit-outline" @click="$router.push('/manage/goods/edit/'+row._id)">编辑</el-button>
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
    const { page = 1, size = 10 } = this.$route.query;
    return {
      tableData: [],
      page:page*1,
      size:size*1,
      total: 0
    };
  },
  created() {
    this.getData();
    console.log('List.created',this)
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
      result.forEach(item => {
        // 如果没有商品大图，则把第一张小图用于显示
        if (item.img_url === undefined && item.imgs) {
          item.img_url = item.imgs[0];
        }
      });
      this.tableData = result;
      this.total = total;
    },
    changeSize(size) {
      this.size = size;
      this.getData();
      // this.$route.query.size = size;
      this.$router.replace({
        // path:'/manage/goods/list',
        query: { ...this.$route.query, size }
      });
    },
    changePage(page) {
      this.page = page;
      this.getData();
      this.$router.replace({
        // path:'/manage/goods/list',
        query: { ...this.$route.query, page }
      });
    },
    select(selection) {
      const ids = selection.map(item => item._id);
      console.log("select", ids);
    }
  }
};
</script>
