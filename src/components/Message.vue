<template>
  <div class="message">
      <p class="timestamp">{{new Date(msg.timestamp*1000).toLocaleString()}}</p>
      <p class="messagetext">{{msg.message}}</p>
  </div>
</template>
<style>
.message {
  background: rgb(150,150,150);
  background: linear-gradient(270deg, rgba(150,150,150,1) 0%, rgba(245,206,255,0) 0%, rgba(158,251,255,1) 32%);
  width:600px;
  height:100px;
  padding:10px;
  margin:10px auto;
}
.messagetext {
  text-align:left;
  
}
.timestamp {
  text-align:left;
  color: #77006d;
}
</style>
<script>
export default {
  name: 'Message',
  data: function () {
    return {
    }
  },
  props: {
    msg: Object
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
