<template>
    <div class="input-group mb-3">
        <input type="text" class="form-control" v-model="todo" ref="input" @keyup.enter="addItem">
        <!-- <button class="btn btn-success" type="button" @click="addItem">添加</button> -->
        <!-- <TodoButton class="btn-success">
          <span>添加</span>
          
          <template v-slot:en>
            <span>add</span>
          </template>
        </TodoButton>
        <TodoButton></TodoButton> -->

        <TodoButton class="btn-success" @click.native="addItem">添加</TodoButton>
    </div>
</template>
<script>


export default {
  data() {
    return {
      todo: ""
    };
  },
  methods: {
    addItem() {
      // 触发当前组件上的自定义事件add，并传递参数
      this.$emit("add", this.todo);

      // 清空并自动获得焦点
      this.todo = "";
      this.$refs.input.focus();
    }
  },
};
</script>

