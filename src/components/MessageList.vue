<template>
  <div>
      <span v-for="message in messages" :key="message.timestamp">
      <Message :msg=message />
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
    }
  },
  props: {
    messages: Array
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
