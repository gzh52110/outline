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
        
        <main style="overflow:hidden" v-if="cartlist.length>0">
            <van-row v-for="item in cartlist" :key="item._id" type="flex" align="center">
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
                                <van-stepper :value="item.qty" theme="round" button-size="22" :name="item._id" disable-input @change="changeQty" />
                            </template>
                        </van-card>
                        <template #right>
                            <van-button square type="danger" text="删除" class="btnDelete" @click="removeItem(item._id)" />
                        </template>
                    </van-swipe-cell>
                </van-col>
            </van-row>
        </main>
        <van-empty description="描述文字" v-else>
            <van-button round type="danger" size="small" plain to="/discover">去购买</van-button>
        </van-empty>
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
    
    };
  },
  computed:{
      totalPrice(){
          return this.cartlist
          // 过滤掉未选择的商品
          .filter(item=>this.selectIds.includes(item._id))
          // 对选中的商品进行计算总价
          .reduce((prev,item)=>prev+item.sales_price*item.qty,0)*100
      },
      checkedAll:{
          get(){
              return this.cartlist.every(item=>this.selectIds.includes(item._id))
          },
          set(newVal){
              this.selectIds = newVal ? this.cartlist.map(item=>item._id) : []
          }
      },
      cartlist(){
          return this.$store.state.cartlist
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
          this.$dialog.confirm({
            title: '确认删除',
            message: 'are you 确定',
        })
        .then(() => {
            this.$store.commit('removeFromCart',id);
        })
        
          
      },
      changeQty(value,detail){
          console.log('changeQTy',value,detail)
          this.$store.commit('changeGoodsQty',{id:detail.name,qty:value})
      }
  },
  created(){
      
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

