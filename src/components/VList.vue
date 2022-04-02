<template>
  <table>
    <tr>
      <td v-for="item in items">{{item.text}}</td>
    </tr>
  </table>
</template>

<script>
export default {
  name: "VList",
  props:["items","heads","beans"],
  setup(props){
    const itemNameArr = props.items.map(item=>item.name)
  }
}
</script>

<style scoped>

</style>