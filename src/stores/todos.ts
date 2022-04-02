import {reactive, ref, watch} from "vue";

interface TodoItem {
    title: string,
    createTime: Date,
    isFinished: boolean
}

const STORAGE_KEY = 'vue-todomvc'
// let todoItem = JSON.parse("und")
// console.log("todoItem",todoItem)
localStorage.setItem(STORAGE_KEY, JSON.stringify([{
    title: "hello",
    createTime: new Date(),
    isFinished: false
}, {
    title: "world",
    createTime: new Date(),
    isFinished: false
}]))
console.log("todos", localStorage.getItem(STORAGE_KEY))
export const todos = ref<Array<TodoItem>>(JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"))
console.log("todos.v", todos.value)
localStorage.setItem(STORAGE_KEY, JSON.stringify(todos.value))

watch(todos, () => {
    debugger
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos.value))
})


export function useState(data) {
    const state = reactive(data);
    function setState(newState) {
        for (const key in newState) {
           state[key] && (state[key] = newState[key])
        }
    }
    return [state,setState]
}

export function addTodo(todo: TodoItem) {
    debugger
    todos.value.push(todo)
}