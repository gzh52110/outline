<template>
    <table class="table table-striped">
      <thead>
          <tr>
              <th scope="col">
                  <input type="checkbox" v-model="checkAll" />
              </th>
              <th scope="col">#</th>
              <th scope="col">待办事项</th>
              <th scope="col">是否完成</th>
              <th scope="col">添加时间</th>
              <th scope="col">操作</th>
          </tr>
      </thead>
      <tbody>
          <!-- <tr is="todo-item" v-for="(item,index) in list" :key="item.id" :item="item" :index="index" :select-ids="selectIds" :select-item="selectItem"></tr> -->
          <TodoItem v-for="(item,index) in list" :key="item.id" :item="item" :index="index" :select-ids="selectIds" :select-item="selectItem" />
          
      </tbody>
  </table>
</template>
<script>
import TodoItem from './TodoItem.vue';
export default {
  // 接收（声明）父组件传入的数据
  props: ["list"],
  data() {
    return {
      selectIds: []
    };
  },
  computed: {
    checkAll: {
      get() {
        return this.list.every(item => this.selectIds.includes(item.id));
      },
      set(n) {
        if (n) {
          this.selectIds = this.list.map(item => item.id);
        } else {
          this.selectIds = [];
        }
      }
    }
  },
  components: {
    TodoItem
  },
  methods: {
    selectItem(id) {
      const idx = this.selectIds.indexOf(id);
      if (idx >= 0) {
        // 存在就删除
        this.selectIds.splice(idx, 1);
      } else {
        // 不存在添加
        this.selectIds.push(id);
      }
    }
  }
};
</script>

