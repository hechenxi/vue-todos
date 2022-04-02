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

const data = {ok:true,text:"hello,world"}
const obj = reactive(data);
window.obj = obj;
effect(function effectFn() {
    console.log("1")
    document.body.innerText = obj.ok?obj.text:"not";
})
