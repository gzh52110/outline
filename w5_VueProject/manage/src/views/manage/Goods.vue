<template>
    <div>
        Goods: <button @click="changeQty">qty:{{qty}}->{{total}}</button>
        <router-view></router-view>
    </div>
</template>
<script>
import myMixin from '@/mixins/myMixin'
export default {
   mixins: [myMixin],
    data(){
        return {
            qty:2
        }
    },
    // computed:{
    //     total(){
    //         return this.qty*2;
    //     }
    // },
    methods:{
        changeQty(){
            console.log('Goods.changeQty')
            this.qty += 2;
        }
    },
    created(){
        console.log('Goods.created',this)
    }
}
</script>

