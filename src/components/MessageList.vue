<template>
  <div>
      <span v-for="message in messages" :key="message.hash">
        <Message :hoverTarget=hoverTarget :threadName=$route.params.name :threadTimestamp=$route.params.timestamp :msg=message />
      </span>
  </div>
</template>

<script>
import Message from '@/components/Message.vue'

export default {
  name: 'MessageList',
  components: {
      Message
  },
  data: function () {
    return {
      hoverTarget: null
    }
  },
  methods: {
    hoverOn: function(target) {
      this.hoverTarget = target
    },
    hoverOff: function() {
      this.hoverTarget = null
    }
  },
  props: {
    messages: Array,
    threadName: String,
    threadTimestamp: Number
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
</style>
