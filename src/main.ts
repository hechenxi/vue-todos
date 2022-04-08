import {createApp} from 'vue'
import App from './App.vue'
import {effect,reactive} from "./reactive/main";
//
//
// const app = createApp(App)
// app.config.errorHandler = (e) => {
//     console.error(e)
// }
//
// app.mount('#app')

let temp1,temp2;
const data = {foo:true,bar:true}
const obj = reactive(data);
// @ts-ignore
window.obj = obj;
effect(function effectFn1() {
    console.log("effectFn1")
    effect(function effectFn2() {
        console.log("effectFn2")
        temp2 = obj.bar;
    })
    temp1 = obj.foo;
})