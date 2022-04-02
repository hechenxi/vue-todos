<template>
  {{userInfo.name}}
</template>

<script lang="ts">
import {useState} from "../stores/todos";
const [userInfo,setUserInfo] = useState({name:"hello"});

setTimeout(()=>{
  setUserInfo({name:"world"})
},1000)

export default {
  setup(){
    return {
      userInfo
    }
  }
}
</script>

<style scoped>

</style>