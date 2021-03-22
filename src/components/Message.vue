<template>
  <div v-bind:class="{ message: true, highlight: hoverTarget == msg.hash }">
      <span class="msgheader">
        <p class="hash">Hash: {{msg.hash.substring(1, 10)}}</p>
        <button v-on:click="openReplyPrompt()" class="replybutton" type="button">Reply</button>
        <p class="timestamp">{{new Date(msg.timestamp*1000).toLocaleString()}}</p>
      </span>
      <span class="msgbody">
          <a 
          v-if="'replyTarget' in msg" 
          v-on:hover="console.log('hi')" 
          class="replyhash"
          @mouseover="$parent.hoverOn(msg.replyTarget)"
          @mouseleave="$parent.hoverOff()">
            >{{msg.replyTarget.substring(1, 10)}}
          </a>
      <p class="messagetext">{{msg.message}}</p>
      </span>
  </div>
</template>
<script>
import iota from '../iota.js'
export default {
  created: function () {
    this.postMessage = iota.postMessage
    this.generateAddressFromName = iota.generateAddressFromName
  },
  name: 'Message',
  data: function () {
    return {
      hover: true
    }
  },
  methods: {
    openReplyPrompt: function() {
      let replyText = prompt("Reply to: \""+this.msg.message+"\"");
      if (replyText != null) {
        let msgJSON = {message: replyText, replyTarget: this.msg.hash}
        let threadAddress = this.generateAddressFromName(this.threadName, this.threadTimestamp)
        this.postMessage(msgJSON, threadAddress)
      }
    },
    test: function() {
      console.log("boi")
      console.log(this.hoverTarget)
    }
  },
  props: {
    msg: Object,
    threadName: String,
    threadTimestamp: Number,
    hoverTarget: String
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
.message {
  background: rgb(150,150,150);
  background: linear-gradient(270deg, rgba(150,150,150,1) 0%, rgba(245,206,255,0) 0%, rgba(158,251,255,1) 32%);
  width:600px;
  padding:10px;
  margin:10px auto;
}

.highlight {
  background: rgb(98,148,150) !important;
  background: linear-gradient(90deg, rgba(98,148,150,1) 69%, rgba(254,254,254,0) 100%, rgba(238,238,238,1) 100%) !important;
}
.messagetext {
  text-align:left;
  overflow-wrap: break-word;
  word-wrap: break-word;
  white-space: pre-line;
  margin:0;
}
.timestamp {
  text-align:left;
  color: #77006d;
  display:inline-block;
  padding: 0;
  margin: 0;
}

.replybutton {
  text-align:left;
  display:inline-block;
  float:left;
  padding: 1px;
  margin: 0;
}
.replyhash {
  text-align: left;
  width: 100%;
  display: table;
  text-decoration: underline;
  -webkit-user-select: none; /* Safari */        
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */

}
.hash {
  float: left;
  padding: 0;
  margin: 0;
  padding-top: 2px;
  padding-right: 5px;
}

.msgheader {
  display:table;
  width:100%;
  padding-bottom: 15px;
}


</style>
