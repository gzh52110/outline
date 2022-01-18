<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
   
  }
}
</script>

<style lang="scss">
body{margin:0;}
.price {
  del {
    color: #666;
    margin-right: 5px;
    &::before {
      content: "￥";
    }
  }
  span {
    @extend del;
    color: #f00;
  }
}
</style>
