<template>
  <form>
    <input type="text" v-model="newTodo" >
    <button @click.prevent="submit">提交</button>
  </form>
</template>

<script lang="ts">
import {ref} from "vue";
import {addTodo} from "../stores/todos";
export default {
  name: "AddNewTodo",
  setup(){
    const newTodo = ref("");
    function submit(){
      debugger
      addTodo({
        title:newTodo.value,
        createTime:new Date(),
        isFinished:false
      })
      newTodo.value = ""
    }
    return {
      newTodo,
      submit
    }
  }
}
</script>

<style scoped>

</style>