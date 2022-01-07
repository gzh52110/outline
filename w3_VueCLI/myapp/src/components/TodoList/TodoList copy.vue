<template>
    <div class="todolist container">
        <TodoHead v-on:add="addItem"></TodoHead>
        <TodoBody :list="datalist"></TodoBody>
        <TodoFoot :list="datalist"></TodoFoot>
    </div>
</template>
<script>
import TodoHead from './TodoHead.vue';
import TodoBody from './TodoBody.vue';
import TodoFoot from './TodoFoot.vue';

import 'bootstrap/dist/css/bootstrap.css'

export default {
  data() {
    return {
      datalist: [
        {
          id: 1,
          todo: "赚他一个亿津巴布韦币",
          done: true,
          addtime: Date.now() + 3600 * 1000
        },
        {
          id: 2,
          todo: "迎娶白富美，达到人生巅峰",
          done: false,
          addtime: Date.now() + 3600 * 1000 * 5
        },
        {
          id: 3,
          todo: "出任CEO，达到疯癫状态",
          done: false,
          addtime: Date.now()
        }
      ]
    };
  },
  provide: function() {
    return {
      removeItem: this.removeItem,
      completeItem: this.completeItem
    };
  },
  components: {
    TodoHead,
    TodoBody,
    TodoFoot
  },
  methods: {
    addItem(todo) {
      console.log("todo", todo);
      const newItem = {
        id: parseInt(Math.random() * 10000),
        // todo:输入框的内容
        todo,
        done: false,
        addtime: Date.now()
      };

      // 添加到前面位置
      this.datalist.unshift(newItem);
    },
    completeItem(id) {
      this.datalist.forEach(item => {
        if (item.id === id) {
          item.done = !item.done;
        }
      });
    },
    removeItem(idx) {
      this.datalist.splice(idx, 1);
    }
  }
};
</script>
<style>
</style>

