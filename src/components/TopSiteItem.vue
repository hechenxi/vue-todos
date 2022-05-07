<template>
  <div class="top-site-outer">
    <a :href="url" draggable="true">
      <img src="https://vuejobs.com/storage/avatars/ArU0mxg7WPpTIe8Z9pUcN11Mt75IHgcgJgCepTY0.png" title={{title}} />
      <span>{{title}}</span>
    </a>
  </div>
</template>

<script>
export default {
  name: "TopSiteItem",
  props:["title","icon","url"]
}
</script>

<style scoped>
a {
  display: flex;
  flex-direction: column;
  align-items: center;
  /*justify-content: center;*/
}
img {
  width: 48px;
  height: 48px;
}
.top-site-outer{

}
</style>