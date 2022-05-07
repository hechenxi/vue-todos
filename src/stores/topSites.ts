import {ref,reactive} from "vue";
const STORAGE_KEY = 'vue-top-sites'

interface TopSiteItem {
    title:string,   //名称
    icon:string,    //图标
    url:string
}
const testData = [
    {
        title:"hello",
        icon:"",
        url:""
    },
    {
        title:"world",
        icon:"",
        url:""
    }
]
// export const topSites = ref<Array<TopSiteItem>>(JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"))
export const topSites = reactive<Array<TopSiteItem>>(testData)
