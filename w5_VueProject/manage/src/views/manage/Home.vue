<template>
    <div>Home

        <button>qty:{{qty}}</button>
    </div>
</template>
<script>
import myMixin from '@/mixins/myMixin'
export default {
    mixins: [myMixin],
    // data(){
    //     return {
    //         qty:1
    //     }
    // },
    // computed:{
    //     total(){
    //         return this.qty*10;
    //     }
    // },
    // methods:{
    //     changeQty(){
    //         this.qty++;
    //     }
    // },
    created(){
        console.log('Home.created',this)
    }
}
</script>

