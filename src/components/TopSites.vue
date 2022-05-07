<template>
  <div class="container">
    <ul>
      <li v-for="(topSite,index) in topSites" :key="index">
        <TopSiteItem :title="topSite.title"></TopSiteItem>
      </li>
    </ul>
  </div>
</template>

<script>
import TopSiteItem from "./TopSiteItem.vue";


export default {
  name: "TopSites",
  components:{TopSiteItem},
  props:["topSites"]
}
</script>

<style scoped>
  .container {
    width: 100%;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    padding: 0;
  }
  li {
    list-style: none;
    width: 100px;
  }
</style>