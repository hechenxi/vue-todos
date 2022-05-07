<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
import TodoList from './components/TodoList.vue'
import AddNewTodo from './components/AddNewTodo.vue'
import FooterInfo from './components/FooterInfo.vue'
import Search from './components/Search.vue'
import TopSites from "@/components/TopSites.vue";
import {topSites} from "./stores/topSites";
import {bookmarks} from "./stores/bookmarks";
import Bookmarker from "@/components/Bookmark.vue";


</script>

<template>
  <main>
    <div class="left">
      <Bookmarker :bookmarks="bookmarks"></Bookmarker>
<!--      <TodoList></TodoList>-->
<!--      <AddNewTodo></AddNewTodo>-->
    </div>
    <div class="right">
      <Search></Search>
      <TopSites :top-sites="topSites" />
    </div>
  </main>
  <FooterInfo></FooterInfo>
</template>

<style>
@import './assets/base.css';

main{
  display: flex;
  height: 100%;
}
.left{
  width: 30%;
}
.right{
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#app {
  height: 100vh;
}

</style>
