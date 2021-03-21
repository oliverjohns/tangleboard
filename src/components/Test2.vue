<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    
    <input v-model="tag" type="text">
    <button v-on:click="Connect()">Connect</button>
    <video id="Video3" playsinline controls loop muted> </video>
        
   
    

  </div>
</template>

<script>
//var wrtc = require('wrtc')
//ar Peer = require('simple-peer')
//var peer2;
import iota from '../iota.js'
export default {
  created: function () {
    this.postMessage = iota.postMessage
    this.generateTag = iota.generateTag
    this.fetchMessagesWithTags = iota.fetchMessagesWithTags
  },
  name: 'Test2',
  data: function () {
    return {
      threadNameInput: ""
    }
  },
  props: {
    msg: String
  },
  methods: {
    Connect: function () {
      console.log("walls")

      
      const tag = this.tag;
      var signals = []
      this.fetchMessagesWithTags(this.$chatAddress,signals, [this.generateTag(tag)])
      console.log("coola killen",signals.length)
      signals.forEach(signal => {
        console.log(signal)
      })

      /*peer2 = new Peer({  wrtc: wrtc , iceServers: [{
      urls: "stun:stun.stunprotocol.org"}]})
      peer2.signal(data)
      peer2.on('signal', data => {
  // when peer1 has signaling data, give it to peer2 somehow
      console.log("we here",  JSON.stringify(data))
    
      })
      peer2.on('error', err => console.log('error', err))
      peer2.on('stream', stream => {
          // got remote video stream, now let's show it in a video tag
          console.log("started from the bottom now we are here", stream)
          var video = document.getElementById('Video3')

            if ('srcObject' in video) {
          video.srcObject = stream
          } else {
            video.src = window.URL.createObjectURL(stream) // for older browsers
          }



          video.play()
        })

      peer2.on('data', data => {      
        // got a data channel message
        console.log('got a message from peer1: ' + data)
      })
    

        //this.postMessage({"name": threadName}, this.$boardAddress)
        //this.$router.push({ name: 'threadviewer', params: { name: threadName } })*/
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
