<template>
  <div class="createmessage">
    <h3>Write new message</h3>
    <textarea
      class="createmessagebox"
      v-model="messageInput" 
      type="text"
      @keydown.enter.exact.prevent
      @keyup.enter.exact="postMessageButton"
      @keydown.enter.shift.exact="newline">
    </textarea>
    <!-- button v-on:click="postMessageButton()">Post</button -->
  </div>
</template>

<script>
import iota from '../iota.js'
export default {
  created: function () {
    this.postMessage = iota.postMessage
    this.addMessage = iota.addMessage
    this.generateAddressFromName = iota.generateAddressFromName
  },
  name: 'CreateMessage',
  data: function () {
    return {
        messageInput: null
    }
  },
  props: {
      threadName: String,
      threadTimestamp: Number
  },
  methods: {
    newline: function() {
      this.messageInput = `${this.messageInput}\n`;
    },
    postMessageButton: function () {
      let threadAddress = this.generateAddressFromName(this.threadName, this.threadTimestamp)
      let msg = this.messageInput
      this.messageInput = ""
      this.postMessage({"message": msg}, threadAddress).then(async bundle => {
        this.addMessage(bundle, this.$parent.messages)
        return null
      })
      this.messageInput = ""
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
.createmessage {
  padding-bottom: 50px;
}
.createmessagebox {
  width:600px;
}
</style>
