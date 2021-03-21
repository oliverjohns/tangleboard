<template>
  <div class="createthread">
    <h1 class="oswald">{{ msg }}</h1>
    
    <input v-model="threadNameInput" type="text">
    <button v-on:click="createThread()">Create</button>
    

  </div>
</template>
<style>
.createthread {
  background: rgb(238,238,238);
  padding: 30px 50px;
  margin: 10px auto;
  display: table;
}
</style>
<script>
import iota from '../iota.js'
export default {
  created: function () {
    this.postMessage = iota.postMessage
  },
  name: 'CreateThread',
  data: function () {
    return {
      threadNameInput: ""
    }
  },
  props: {
    msg: String
  },
  methods: {
    createThread: function () {
      const threadName = this.threadNameInput;
      this.postMessage({"name": threadName}, this.$boardAddress)
      this.$router.push({ name: 'threadviewer', params: { name: threadName } })
    }
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
.oswald {
      font-family: "Oswald", Helvetica, Arial;
    font-size: 70px;
    margin-top: 0px;
}
</style>
