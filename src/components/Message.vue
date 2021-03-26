<template>
  <div v-bind:class="{ message: true, highlight: hoverTarget == msg.hash }">
      <span class="msgheader">
        <p class="hash">Hash: {{msg.hash.substring(1, 10)}}</p>
        <button v-on:click="openReplyPrompt()" class="replybutton" type="button">Reply</button>
        <p class="timestamp">{{new Date(msg.timestamp*1000).toLocaleString()}}</p>
      </span>
      <div class="msgbody">
        <div v-if="imgUrl != null" class="thumbnail">
              <img
                :src=imgUrl
                v-on:click="openLightBox()"
              >
        </div>
        <div class="msgbodyinner">
            
            <LightBox
              ref="lightbox"
              :show-caption="true"
              :show-light-box="false"
            />
            <a 
            v-if="'replyTarget' in msg" 
            v-on:hover="('hi')" 
            class="replyhash"
            @mouseover="$parent.hoverOn(msg.replyTarget)"
            @mouseleave="$parent.hoverOff()">
              >{{msg.replyTarget.substring(1, 10)}}
            </a>
        <p class="messagetext">{{msg.message}}</p>
        </div>
      </div>
  </div>
</template>
<script>
import iota from '../iota.js'
import LightBox from './LightBox'
export default {
  components: {
    LightBox,
  },
  created: function () {
    this.postMessage = iota.postMessage
    this.generateAddressFromName = iota.generateAddressFromName
  },
  name: 'Message',
  data: function () {
    return {
      hover: true,
      imgUrlRegexp : /(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/,
      imgUrl: null
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
    openLightBox: function() {
      let imgObject = { src: this.imgUrl, id: 0, type: "image", srcset: "", caption: this.imgUrl}
      this.$refs.lightbox.showImage(imgObject)
    }
  },
  mounted() {
    let imgUrlArr = this.msg.message.match(this.imgUrlRegexp)
    if (imgUrlArr != null) {
      this.imgUrl = imgUrlArr[0]
      this.msg.message = this.msg.message.replace(this.imgUrl,'')
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

.thumbnail {
  flex: 0 0 25%;
}

.thumbnail img {
  cursor: pointer;
  max-width:100%;
  object-fit:cover;
}
.msgbody {
  display: flex;
  
}

.msgbodyinner {
  flex: 1;
  padding-left: 30px;
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

/* IMAGE STUFF */


</style>
