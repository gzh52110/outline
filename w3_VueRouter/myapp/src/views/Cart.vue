<template>
    <div class="has-navbar">
        <van-nav-bar
            title="购物车"
            left-text="返回"
            left-arrow
            fixed
        >
            <template #left>
                <van-icon name="arrow-left" size="20" style="margin-right:10px" @click="$router.back()" />
                <van-icon name="wap-home-o" size="20" @click="$router.push('/home')" />
            </template>

            <template #right>
                <van-button type="info" size="mini" plain style="border:none">编辑</van-button>
            </template>
        </van-nav-bar>
        <van-steps :active="active">
            <van-step>购物车</van-step>
            <van-step>下单</van-step>
            <van-step>支付</van-step>
            <van-step>交易完成</van-step>
        </van-steps>
        <main style="overflow:hidden">
            <van-row v-for="item in goodslist" :key="item._id" type="flex" align="center">
                <van-col span="2" @click="selectItem(item._id)">
                    <van-checkbox :value="selectIds.includes(item._id)"></van-checkbox>
                </van-col>
                <van-col span="22">
                    <van-swipe-cell>
                        <van-card
                            :num="item.qty"
                            :origin-price="item.price"
                            :price="item.sales_price"
                            desc="描述信息"
                            :title="item.goods_name"
                            :thumb="$host + item.img_url"
                        >
                            <template #price>
                                <span class="price"><span>{{item.sales_price}}</span></span>
                            </template>
                            <template #num>
                                <van-stepper v-model="item.qty" theme="round" button-size="22" disable-input />
                            </template>
                        </van-card>
                        <template #right>
                            <van-button square type="danger" text="删除" class="btnDelete" @click="removeItem(item._id)" />
                        </template>
                    </van-swipe-cell>
                </van-col>
            </van-row>
        </main>

        <van-submit-bar :price="totalPrice" button-text="下单" @submit="onSubmit">
            <van-checkbox v-model="checkedAll">全选</van-checkbox>
            <template #tip>
                你的收货地址不支持同城送, <span>修改地址</span>
            </template>
        </van-submit-bar>
    </div>
</template>
<script>
export default {
  name: "Cart",
  data() {
    return {
      active: 0,
      selectIds:[],
      goodslist: [
        {
          _id: "6037755f08f65d3a6c243511",
          goods_name:
            "瑞士艺术制表大师 爱宝时（EPOS）-Sportive运动系列海兽克拉肯 砾岩黑 3441.131.20.55.30 潜水机",
          category: "运动表",
          price: 9900,
          sales_price: 7095,
          inventory: 180,
          img_url: "/img/62973840d24947d696882fdec2174492.jpg",
          qty: 1
        },
        {
          _id: "6037755f08f65d3a6c243513",
          goods_name:
            "Sportive运动系列海兽克拉肯3441.131.99.52.52 潜水机械男表",
          category: "运动表",
          price: 9900,
          sales_price: 84,
          inventory: 48,
          img_url: "/img/530a2b99a3db40d9bfd2237b3e5c5c2d.jpg",
          qty: 10
        },
        {
          _id: "6037755f08f65d3a6c243514",
          goods_name:
            "瑞士艺术制表大师 爱宝时（EPOS）-Sportive运动系列 小青龙3442.132.20.13.30 机械男表",
          category: "运动表",
          price: 9800,
          sales_price: 7080,
          inventory: 537,
          img_url: "/img/7e6a34a0013945e2a8bddc756a6c7bed.jpg",
          qty: 2
        }
      ]
    };
  },
  computed:{
      totalPrice(){
          return this.goodslist
          // 过滤掉未选择的商品
          .filter(item=>this.selectIds.includes(item._id))
          // 对选中的商品进行计算总价
          .reduce((prev,item)=>prev+item.sales_price*item.qty,0)*100
      },
      checkedAll:{
          get(){
              return this.goodslist.every(item=>this.selectIds.includes(item._id))
          },
          set(newVal){
              this.selectIds = newVal ? this.goodslist.map(item=>item._id) : []
          }
      }
  },
  methods:{
      onSubmit(){

      },
      selectItem(id){
          const idx = this.selectIds.indexOf(id)
          if(idx>=0){
              this.selectIds.splice(idx,1)
          }else{
              this.selectIds.push(id);
          }
      },
      removeItem(id){
          this.goodslist = this.goodslist.filter(item=>item._id != id)
      }
  },
  mounted() {
    this.$parent.showMenu = false;
  },
  destroyed() {
    this.$parent.showMenu = true;
  }
};
</script>
<style>
button.btnDelete {
  margin-left: 2px;
  height: 100%;
}
div.van-card {
  background-color: #fff;
}
</style>

