import {ref,reactive} from "vue";
const STORAGE_KEY = 'vue-top-sites'

interface Bookmark {
    title:string,   //名称
    icon:string,    //图标
    url:string,
    children?:Bookmark[]
}
const testData:Bookmark[] = [
    {
        title:"hello",
        icon:"",
        url:""
    },
    {
        title:"world",
        icon:"",
        url:""
    },
    {
        title:"文件夹",
        icon:"",
        url:"",
        children:[
            {
                title:"文件夹1-1",
                icon:"",
                url:"",
            },
            {
                title:"文件夹1-2",
                icon:"",
                url:"",
            }
        ]
    }
]
// export const topSites = ref<Array<TopSiteItem>>(JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"))
export const bookmarks = reactive<Array<Bookmark>>(testData)
