<template>
  <div class="threadlist">
    <h1 class="oswald">{{ msg }}</h1>

 <table class="threads">
  <tr v-for="thread in threads" :key="thread.hash">
    <th><router-link :to="{ name: 'threadviewer', params: { name: thread['name'], timestamp: thread['timestamp'] }}">{{thread['name']}}</router-link></th>
    <th>{{new Date(thread['timestamp']*1000).toLocaleString()}}</th>
  </tr>
</table> 
  </div>
</template>

<script>
import iota from '../iota.js'
import {globalSettings} from '../main.js'
export default {
  created: function () {
    this.fetchMessages = iota.fetchMessages
  },
  name: 'ThreadList',
  data: function () {
    return {
      threads: [],
      intervalid1: null
    }
  },
  methods: {
    fetchThreads: function() {
      this.fetchMessages(this.$boardAddress, this.threads, true)
    },
    startAutoFetchingThreads: function() {
      this.fetchThreads()
      if (globalSettings.refreshTime > 0) {
        this.intervalid1 = setInterval(function(){
            this.fetchThreads()
        }.bind(this), globalSettings.refreshTime*1000);
      }    
    },
    stopAutoFetchingThreads: function() {
      clearInterval(this.intervalid1)
    }
  },
  props: {
    msg: String
  },
  mounted: function() {
    this.startAutoFetchingThreads()
  },
  beforeDestroy: function() {
    this.stopAutoFetchingThreads()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #77006d;
}
.threads {
  width: 100%;
}
.threads th {
  text-align: left;
}
.threadlist {
  background: rgb(238,238,238);
  padding: 20px 50px;
  display:table;
  margin: 30px auto;
}
.oswald {
      font-family: "Oswald", Helvetica, Arial;
    font-size: 70px;
    margin-top: 0px;
}
</style>
