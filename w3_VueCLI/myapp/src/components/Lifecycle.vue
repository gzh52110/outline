<template>
    <div>
        <h4>生命周期</h4>
        <p @click="count++">count:{{count}}</p>
        <button @click="$destroy()">销毁组件</button>
    </div>
</template>
<script>
    export default {
        // 组件选项
        data(){
            console.log('data')
            return {
                count:1
            }
        },
        // render(){},
        computed:{

        },
        methods:{

        },
        watch:{
            count(n){
                console.log('count',n);
            }
        },

        // 生命周期钩子：在生命周期特定阶段自动执行的函数

        // @创建阶段:
        beforeCreate(){
            console.log('beforeCreate',this)
        },
        created(){
            console.log('created',this.count,this.$el)
        },

        // @挂载阶段：根据虚拟节点创建真实节点，并渲染到页面
        beforeMount(){
            console.log('beforeMount',this.$el)
        },
        mounted(){
            console.log('mounted',this.$el)
        },

        // @销毁阶段
        beforeDestroy(){
            console.log('beforeDestroy')
        },
        destroyed(){
            console.log('destroyed')
        },
    }
    
</script>
<style>

</style>
