<template>
    <div>总数：{{list.length}}，完成：{{completelist.length}}，未完成：{{unCompletelist.length}}</div>
</template>
<script>
export default {
  props: ["list"],
  computed: {
    completelist() {
      return this.list.filter(item => item.done);
    },
    unCompletelist() {
      return this.list.filter(item => !item.done);
    }
  }
};
</script>

