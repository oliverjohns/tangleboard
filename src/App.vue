<template>
  <div id="app">
    <div id="nav">
      <img class="globe" src="./assets/globe2.gif">
      <h1 class="title">TangleBoard</h1>
      <router-link to="/">Home</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
</script>


<style>
@font-face {
  font-family: "Mexcellent";
  src: local("Mexcellent"),   url(./assets/fonts/mexcellent.3d.otf) format("opentype");}
  @font-face {
  font-family: "Oswald";
  src: local("Oswald"),   url(./assets/fonts/oswald.light.ttf) format("truetype");}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  top:0;
  margin:0;
}

.title {
    font-family: "Mexcellent", Helvetica, Arial;
    font-size: 150px;
    color:#eeeeee;
    -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #77006d;
}
</style>
