<template>
  <ul>
    <li v-for="(bookmark,index) in bookmarks" :key="index">
      {{bookmark.title}}
      <Bookmark v-if="bookmark.children" :bookmarks="bookmark.children"></Bookmark>
    </li>
  </ul>
</template>

<script>
export default {
  name: "Bookmark",
  props:["bookmarks"]
}
</script>

<style scoped>
  ul {
    padding-left: 10px;;
  }
  li {
    list-style: none;
  }
</style>