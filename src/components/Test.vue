<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    
    <input v-model="tag" type="text">
    <button v-on:click="CreateStream()">Create Stream</button>
    <button v-on:click="Connect()">Connec</button>
    <video id="Video" playsinline controls loop muted> </video>
    

  </div>
</template>

<script>
var wrtc = require('wrtc')
var Peer = require('simple-peer')
var peer1;
var streamTag= ""
// get video/voice stream


 

import iota from '../iota.js'
export default {
  created: function () {
    this.postMessage = iota.postMessage,
    this.fetchMessage = iota.fetchMessageWithTag
    this.generateTag = iota.generateTag
  },
  name: 'Test',
  data: function () {
    return {
      threadNameInput: ""
    }
  },
  props: {
    msg: String
  },
  methods: {
    CreateStream: function () {
     streamTag = this.tag
     navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    }).then(this.gotMedia).catch(() => {})

    },
    Connect: function () {
      console.log(streamTag)
    },
    gotMedia: function (Vstream) {
    var video = document.getElementById('Video')

      if ('srcObject' in video) {
        video.srcObject = Vstream
      } else {
        video.src = window.URL.createObjectURL(Vstream) // for older browsers
      }



      video.play()
      peer1 = new Peer({ wrtc: wrtc , initiator: true,  stream: Vstream,   iceServers: [{

          urls: "stun:stun.stunprotocol.org"}]})


      peer1.on('signal', data => {
        this.postMessage(data, this.$chatAddress, this.generateTag(streamTag))
        // when peer1 has signaling data, give it to peer2 somehow
        console.log("Sent to ",this.$chatAddress)
      
      })
      peer1.on('error', err => console.log('error', err))

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
