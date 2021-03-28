<template>
  <div id="app">
    <div class="topLeftSettings">
        <table>
          <tr>
            <th><p>Refresh interval</p></th>
            <th>      
              <select  v-model="refreshTime" @change="onChangeRefreshTime($event)" name="refreshtime" id="refreshtime">
              <option value=0>Off</option>
              <option value=30>30s</option>
              <option value=10>10s</option>
              <option value=4>4s</option>
              <option value=2>2s</option>
              </select>
            </th>
          </tr>
          <tr>
            <th><p>Use ID</p></th>
            <th><input checked type="checkbox" id="setID" name="setID" @change="checking($event)"></th>
          </tr>
        </table>
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
import crypto from './Crypto.js'
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
      globalSettings.UseID = event.target.checked
    },
    setId: async function() {
        let res = await crypto.generateKey()
        globalSettings.PrivateKey = res.privateKey
        globalSettings.PublicKey  = res.publicKey
    }
  },
  mounted() {
      globalSettings.UseID = true
      this.setId()

  }
}
</script>


<style>
.topLeftSettings {
  position: fixed;
  top: 0;
  left: 0;
  width: 300px;
  padding: 10px;
}

.topLeftSettings p {
  text-align: left;
  padding:0;
  margin:0;
}
.topLeftSettings tr {

}
.topLeftSettings th {
  width: 0;
  white-space: nowrap;

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
  width: 100vw;
  top:0;
  margin:0;
}

.title {
    font-family: "Mexcellent", Helvetica, Arial;
    font-size: 15vw;
    text-align:center;
    margin: 2vh 0;
    max-width: 100%;
    color:#eeeeee;
    -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;
}

.globe {
  width: 25vw;
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
