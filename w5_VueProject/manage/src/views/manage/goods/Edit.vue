<template>
    <div>
        <MyForm :formData="goodsData"/>
    </div>
</template>
<script>
import MyForm from "./MyForm.vue";
export default {
  name: "GoodsEdit",
  data() {
    return {
      goodsData: {}
    };
  },
  created() {
    const { id } = this.$route.params;
    this.getData(id);
  },
  methods: {
    async getData(id) {
      const { data } = await this.$request.get("/goods/" + id);
      const goodsData = data.data;
      if (!goodsData.imgs) {
        goodsData.imgs = [
          { name: "主图", url: this.$host + data.data.img_url }
        ];
      }
      this.goodsData = goodsData;
      //   if(!this.goodsData.imgs){
      //     this.$set(this.goodsData,'imgs',[{name:'主图',url:this.$host + data.data.img_url}])
      //   }
    }
  },
  components: {
    MyForm
  }
};
</script>
