<template>
  <div class="about">
    <h1>{{this.$route.params.name}}</h1>
    <MessageList :messages=messages />
    <CreateMessage :threadName=$route.params.name />
  </div>
</template>
<script>
import MessageList from '@/components/MessageList.vue'
import CreateMessage from '@/components/CreateMessage.vue'
import iota from '../iota.js'
import {globalSettings} from '../main.js'

export default {
  created: function () {
    this.fetchMessages = iota.fetchMessages;
    this.generateAddressFromName = iota.generateAddressFromName;
  },
  name: 'ThreadViewer',
  components: {
    MessageList,
    CreateMessage
  },
  data: function () {
    return {
      messages: [],
      threadAdress: null,
      intervalid1: null
    }
  },
  methods: {
    fetchMessagesforThread: function () {
      this.fetchMessages(this.threadAdress, this.messages)
    },
    startAutoFetchingMessages: function() {
      this.fetchMessagesforThread()
      console.log("refresh time is: " + globalSettings.refreshTime * 1000)   
      if (this.$refreshtime > 0) {
        this.intervalid1 = setInterval(function(){
            this.fetchMessagesforThread()
        }.bind(this), globalSettings.refreshTime*1000);
      }
    },
    stopAutoFetchingMessages: function() {
      clearInterval(this.intervalid1)
    }

  },
  props: {
    name: String
  },
  beforeMount: function() {
    this.threadAdress = this.generateAddressFromName(this.$route.params.name)
    this.startAutoFetchingMessages()
  },
  mounted: function() {
  },
  beforeDestroy: function() {
    this.stopAutoFetchingMessages()
  }
}
</script>