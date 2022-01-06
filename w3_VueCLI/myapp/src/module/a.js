/**
 * ESModule把一个文件当作一个模块，一个模块对应一个模块对象
    * 导出：export
        > export后只能跟function、class、var、let、const、default、{}，export出去后的变量自动成为**模块对象的属性**
 * <script src="a.js" />
 */

// 给模块对象添加username属性
export let username = "laoxie";
export const age = 18;
// 给模块对象添加say方法
export function say(){
    console.log('hello')
}



const a = 10;
const b = 20;

// 批量给模块对象添加属性
export {
    a,
    // 给导出的属性改名
    b as banana
}

// 给模块对象添加default属性，值为100
// export default 100;
// 给模块对象添加default属性，值为一个对象
export default {
    a:10,
    b:20
}