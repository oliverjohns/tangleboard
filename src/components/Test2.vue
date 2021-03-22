<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    
    <input v-model="tag" type="text">
    <button v-on:click="Connect()">Connect</button>
    <video id="Video3" playsinline controls loop muted> </video>
        
   
    

  </div>
</template>

<script>
var wrtc = require('wrtc')
var Peer = require('simple-peer')
var peer2;
var streamTag= ""
import iota from '../iota.js'
export default {
  created: function () {
    this.sessionkey  = Math.random().toString(36)
    this.candidateSent = false
    this.offerRec = false
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
    ProcessOffer: function (signal) {
      //console.log(signal)
      if (signal.key != this.sessionkey && signal.Data.type=="offer"){
        console.log("process ", signal)
        peer2.signal(signal.Data)
        this.offerRec = true
      }
    },
    ProcessCandidate: function (signal) {
    if (!this.offerRec){
      setTimeout(() => { this.ProcessCandidate(signal); }, 5000);
      return
    }
    if (signal.key != this.sessionkey && signal.Data.type=="candidate"){
      console.log("process ", signal)
      peer2.signal(signal.Data)
    }
  },
    Connect: function () {
      peer2 = new Peer({  wrtc: wrtc , iceServers: [{
      urls: "stun:stun.stunprotocol.org"}]})
      
      streamTag = this.tag;
      this.fetchMessagesWithTags(this.$chatAddress, this.ProcessOffer, [this.generateTag(streamTag)])
      this.fetchMessagesWithTags(this.$chatAddress, this.ProcessCandidate, [this.generateTag(streamTag)])
   

    
      peer2.on('signal', data => {
        if (data.type == "answer"){
          let signalData = {Data:data, key:this.sessionkey}
          this.postMessage(signalData, this.$chatAddress, this.generateTag(streamTag))
        }
        else if (data.type == "candidate"){
          this.candidateSent=true
          let signalData = {Data:data, key:this.sessionkey}
          this.postMessage(signalData, this.$chatAddress, this.generateTag(streamTag))
          
        }
    
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
