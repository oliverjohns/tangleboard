<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    
    <input v-model="threadNameInput" type="text">
    <button v-on:click="createThread()">Create</button>
    

  </div>
</template>

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
  color: #42b983;
}
</style>
