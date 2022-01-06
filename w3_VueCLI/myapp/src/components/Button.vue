<template>
    <button class="btn">
        <!-- <div class="cn">
            <slot name="cn"></slot>
        </div>
        <div class="en">
            <slot name="en">Button</slot>
        </div>
        <div class="default">
            <slot>按钮</slot>
        </div> -->
        <slot>按钮</slot>
    </button>
</template>
<script>
export default {
    name:'TodoButton',

    // 是否继承attr属性（非props属性），默认为true
    // 不管该属性为true或false，class与style都能自动继承
    // inheritAttrs:false,

    // props属性：自动称为组件实例的属性
    props:['text'],
    data(){
        console.log('Button',this);
        return {}
    },
    // render(){}
}
</script>
