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
      threadAdress: null
    }
  },
  methods: {
    fetchMessagesforThread: function () {
      this.fetchMessages(this.threadAdress, this.messages)
    },
    startAutoFetchingMessages: function() {           
    this.intervalid1 = setInterval(function(){
        this.fetchMessagesforThread()
    }.bind(this), 4000);
  }
  },
  props: {
    name: String
  },
  beforeMount() {
    this.threadAdress = this.generateAddressFromName(this.$route.params.name)
    console.log(this.threadAdress)
    this.startAutoFetchingMessages()
  }
}
</script>