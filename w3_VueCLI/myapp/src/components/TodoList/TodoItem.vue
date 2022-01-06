<template>
    <tr @click="selectItem(item.id)">
        <th scope="row"><input type="checkbox" :checked="selectIds.includes(item.id)" /></th>
        <th scope="row">{{index+1}}</th>
        <td>{{item.todo}}</td>
        <!-- <td>{{item.done ? '是' : '否'}}</td> -->
        <td>
            <button type="button" class="btn btn-outline-secondary btn-sm" disabled v-if="item.done">是</button>
            <button type="button" class="btn btn-outline-secondary btn-sm" disabled v-else>否</button>
        </td>
        <td>{{item.addtime}}</td>
        <td>
            <!-- <button type="button" class="btn btn-primary" @click.stop="completeItem(item.id)">完成</button>
            <button type="button" class="btn btn-danger" @click.stop="removeItem(index)">删除</button> -->
            <TodoButton class="btn-primary" @click.stop.native="completeItem(item.id)">完成</TodoButton>
            <TodoButton class="btn-danger" @click.stop.native="removeItem(index)">删除</TodoButton>
        </td>
    </tr>
</template>
<script>
export default {
  props: ["item", "index", "selectIds", "selectItem"],
  inject: ["completeItem", "removeItem"],
  // inject:{
  //     complete:'completeItem',
  //     remove:{
  //         from:'removeItem'
  //     }
  // },
  data() {
    return {};
  },
  template: `#TodoItem`
};
</script>

