<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    
    <h3>Threads</h3>
    <ul>
      <li v-for="thread in threads" :key="thread"><router-link :to="{ name: 'threadviewer', params: { name: thread['name'] }}">{{thread['name']}}</router-link></li>
    </ul>

  </div>
</template>

<script>
import iota from '../iota.js'
export default {
  created: function () {
    this.fetchMessages = iota.fetchMessages
  },
  name: 'ThreadList',
  data: function () {
    return {
      threads: [{"name": "thread 1"}]
    }
  },
  props: {
    msg: String
  },
  mounted: function() {
    
    this.fetchMessages(this.$boardAddress, this.threads)
    console.log(this.threads)
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
