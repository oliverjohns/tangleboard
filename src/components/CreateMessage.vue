<template>
  <div>
    <h3>Write new message</h3>
    <input v-model="messageInput" type="text">
    <button v-on:click="postMessageButton()">Post</button>
  </div>
</template>

<script>
import iota from '../iota.js'
export default {
  created: function () {
    this.postMessage = iota.postMessage
    this.generateAddressFromName = iota.generateAddressFromName
  },
  name: 'CreateMessage',
  data: function () {
    return {
        messageInput: null
    }
  },
  props: {
      threadName: String
  },
  methods: {
    postMessageButton: function () {
      console.log("threadNames")
      console.log(this.threadName)
      let threadAddress = this.generateAddressFromName(this.threadName)
      this.postMessage({"message": this.messageInput}, threadAddress)
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
