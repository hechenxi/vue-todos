import {createApp} from 'vue'
// import App from './App.vue'
// import {effect,reactive,computed,watch} from "./reactive/main";
//
//
const app = createApp(App)
// app.config.errorHandler = (e) => {
//     console.error(e)
// }
//
// app.mount('#app')
//
// let temp1,temp2;
// const data = {foo:true,bar:true}
// const obj = reactive(data);
// // @ts-ignore
// window.obj = obj;
// watch(()=>obj.foo,(ov,nv)=>{
//     console.log("ov",ov)
//     console.log("nv",nv)
// })
// effect(function effectFn1() {
//     console.log("effectFn1")
//     effect(function effectFn2() {
//         console.log("effectFn2")
//         temp2 = obj.bar;
//     })
//     temp1 = obj.foo;
// })

// const obj2 = reactive({foo:1,bar:2});
// const sum = computed(()=>obj2.foo+obj2.bar)
// effect(()=>{
//     console.log("sum.value",sum.value)
// })
// // @ts-ignore
// window.obj2 = obj2;
// // @ts-ignore
// window.sum = sum;

import {ref, effect} from "vue";
import {domRenderer} from "./renderer/dom-renderer"

let vnode1 = {
    type: 'div',
    props:{
      id:'foo'
    },
    children: [
        {
            type:"p",
            children:"hello"
        },
        {
            type:"p",
            children:"world"
        }
    ]
}
let newVnode = ""


domRenderer.render(vnode1, document.querySelector('#app'))