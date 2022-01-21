export default {
    mixins:[],
    data() {
      return {
        qty: 10
      };
    },
    computed: {
      total() {
        return this.qty * 10;
      }
    },
    methods: {
      changeQty() {
        console.log('myMixin.changeQty')
        this.qty++;
      }
    },
    created(){
        console.log('myMixin.created')
    }
  }