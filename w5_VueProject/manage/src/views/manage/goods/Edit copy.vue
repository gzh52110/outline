<template>
    <div>
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
            <el-form-item label="商品名称" prop="goods_name">
                <el-input v-model="form.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="category">
                <el-select v-model="form.category" placeholder="请选择分类">
                <el-option v-for="item in categories" :key="item._id" :label="item.text" :value="item.text"></el-option>
                </el-select>
            </el-form-item>
                <el-form-item label="商品图片">
                    <el-upload
                        ref="uploadForm"
                        name="goods"
                        :action="$host+'/api/upload/goods'"
                        list-type="picture-card"
                        :auto-upload="false"
                        :http-request="uploadFile"
                        :file-list="imgs"
                        >
                            <i class="el-icon-plus"></i>
                            <template v-slot:file="{file}">
                                <img
                                    class="el-upload-list__item-thumbnail"
                                    :src="file.url" alt=""
                                >
                                
                            </template>
                        </el-upload>

                </el-form-item>
                <el-form-item label="原价">
                <el-col :span="6">
                <el-input v-model.number="form.price" placeholder="原价"></el-input>
                </el-col>
                <el-col class="line" :span="4" style="text-align:right;padding-right:5px;">现价</el-col>
                <el-col :span="6">
                <el-input v-model.number="form.sales_price" placeholder="现价"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="商品描述" prop="desc">
                <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item label="上架" prop="online">
                <el-switch v-model="form.online"></el-switch>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">修改</el-button>
            </el-form-item>
            </el-form>
    </div>
</template>
<script>
export default {
  name: "GoodsEdit",
  data() {
    return {
      goodsid: "",
      imgs:[],
      form: {
        goods_name: "",
        category: "男士表",
        desc: "",
        online: false,
        price: "",
        sales_price: ""
      },
      categories: [],
      rules: {
        goods_name: [
          { required: true, message: "请输入商品名称", trigger: "blur" }
        ],
        category: [{ required: true, message: "请选择分类", trigger: "blur" }]
      },
      uploadData: {},
      uploadHeader: {}
    };
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    }
  },
  created() {
    const { id } = this.$route.params;
    this.getData(id);
    this.getCategory();
  },
  methods: {
      async getData(id){
          const {data} = await this.$request.get('/goods/'+id)

          this.form = data.data;
          this.imgs = data.data.imgs ? data.data.imgs : [{name:'主图',url:this.$host + data.data.img_url}]
      },
    onSubmit() {
      // 添加商品 -> 拿到商品id -> 上传图片
      this.$refs.form.validate(async valid => {
        if (valid) {
            const {_id,...params} = this.form;
          const { data } = await this.$request.put("/goods/"+_id, params);
          if(data.code === 200){
              // 上传图片
              this.$refs.uploadForm.submit();
          }

        }
      });
    },
    async uploadFile(fileInfo) {
      const fData = new FormData();
      fData.set("goods", fileInfo.file);
      fData.set("userid", this.userInfo._id);
      fData.set("goodsid", this.form._id);
      const { data } = await this.$request.post("/upload/goods", fData);
    },
    async getCategory() {
      const { data } = await this.$request.get("/category");
      this.categories = data.data.result;
    }
  }
};
</script>
