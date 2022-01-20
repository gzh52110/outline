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
                        :file-list="form.imgs"
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
                <el-button type="primary" @click="onSubmit">{{isEdit ? '修改':'添加'}}</el-button>
            </el-form-item>
            </el-form>
    </div>
</template>
<script>
export default {
  name: "MyForm",
  // props数据类型校验
  //   props:['formData'],
  props: {
      
    formData: Object,
    // formData:{
    //     type:Object,
    //     required:true,// 必填
    // },

    // 测试数据
    // index:Number,
    // index:[Number,String],
    // url:{
    //     type:String,
    //     required:true
    // }
    // url:{
    //     type:String,
    //     default:'http://localhost:2110'
    // },
    // params:{
    //     type:Object,
    //     default:function(){
    //         return {}
    //     }
    // },
    // age:{
    //     type:Number,
    //     validator:function(value){
    //         if(value<18 || value>38){
    //             return false
    //         }
    //         return true;
    //     }
    // }
  },
  data() {
    return {
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
    };
  },
  computed: {
    isEdit() {
      return !!this.formData;
    },
    userInfo() {
      return this.$store.state.userInfo;
    }
  },
  watch: {
    formData(n, o) {
      if (this.isEdit) {
        this.form = n;
        // 后端返回的数据不符合前端要求，需要手动格式化数据
        this.form.imgs = this.form.imgs.map((item,idx)=>{
            if(typeof item === 'string'){
                return {name:'goods'+idx,url:this.$host+item}
            }
        })
      }
    }
  },
  created() {
    console.log("MyForm.created", this);

    this.getCategory();
  },
  methods: {
    onSubmit() {
      // 添加商品 -> 拿到商品id -> 上传图片
      this.$refs.form.validate(async valid => {
        if (valid) {
          const { _id, ...params } = this.form;
          let data;
          if (this.isEdit) {
            const res = await this.$request.put("/goods/" + _id, params);
            data = res.data;
            this.$message({
                type:'success',
                message:'编辑成功'
            })
          } else {
            const res = await this.$request.post("/goods", this.form);
            data = res.data;
            this.form._id = data.data[0];
            this.$message({
                type:'success',
                message:'添加成功'
            })
          }

          if (data.code === 200) {
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
