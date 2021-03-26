<template>
  <div id="app">
    <div class="refreshTimeSetter">
      <p>Refresh interval</p>
      <select  v-model="refreshTime" @change="onChangeRefreshTime($event)" name="refreshtime" id="refreshtime">
        <option value=0>Off</option>
        <option value=30>30s</option>
        <option value=10>10s</option>
        <option value=4>4s</option>
        <option value=2>2s</option>
      </select>
    </div>
    <div class="setID">
      <input type="checkbox" id="setID" name="setID" @change="checking($event)" checked>
         <p>Use ID</p>
    </div>
    
    <div id="nav">
      <img class="globe" src="./assets/globe2.gif">
      <h1 class="title">TangleBoard</h1>
    </div>
    <router-view/>
  </div>
</template>

<script>
import {globalSettings} from './main.js'

export default {
  name: 'App',
  data: function() {
    return {
      
      refreshTime: globalSettings.refreshTime
    }
  },
  methods: {
    onChangeRefreshTime: function(event) {
      
      globalSettings.refreshTime = event.target.value
      this.refreshTime = event.target.value
    },
    checking: function(event) {
      //globalSettings.UseID
      console.log(event.target.checked)
    }
  }
}
</script>


<style>
.refreshTimeSetter {
  position: fixed;
  top: 0;
  left: 0;
  width: 300px;
  padding: 10px;
}
.refreshTimeSetter p {
  float:left;
  padding: 0;
  margin: 0;
  padding-top: 2px;
}
.refreshTimeSetter select {
  float:left;
  margin-left: 15px;
}
.setID {
  position: fixed;
  top: ;
  left: 0;
  width: 300px;
  padding: 10px;
}
.setID p {
  float:left;
  margin-top:  33px;
  margin-left: 5px;
}
.setID input {
  float:left;
  margin-top:  35px;
  margin-left: 15px;
}


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
