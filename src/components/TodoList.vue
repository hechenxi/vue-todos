<template>
  <ul>
    <li v-for="(todo,index) in todos" :key="index" @click="trigger(index)">
      <input v-model="todo.isFinished" type="checkbox">
      <span :style="todo.isFinished?'text-decoration: line-through':''">{{ todo.title }}</span>
    </li>
  </ul>
</template>

<script lang="ts">
import {ref} from "vue";
import {todos} from "../stores/todos";

export default {
  name: "Main",
  setup() {
    function trigger(index:number) {
      todos.value[index].isFinished = !todos.value[index].isFinished
    }
    return {
      todos,
      trigger
    }
  }
}
</script>

<style scoped>
  li{
    list-style: none;
  }
</style>