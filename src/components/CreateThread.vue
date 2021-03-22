<template>
  <div class="createthread">
    <h1 class="oswald">{{ msg }}</h1>
    
    <input v-model="threadNameInput" type="text">
    <button v-on:click="createThread()">Create</button>
    

  </div>
</template>
<style>
.createthread {
  background-image: url("../assets/sky.gif");
  background-size:100% 100%;
  padding: 30px 50px;
  margin: 10px auto;
  display: table;
}
</style>
<script>
import iota from '../iota.js'
export default {
  created: function () {
    this.postThread = iota.postThread
  },
  name: 'CreateThread',
  data: function () {
    return {
      threadNameInput: ""
    }
  },
  props: {
    msg: String
  },
  methods: {
    createThread: function () {
      const threadName = this.threadNameInput;
      let returnedTimestamp = null
      console.log(this.postThread)
      this.postThread({"name": threadName}, this.$boardAddress).then(bundle => {
            returnedTimestamp = bundle[0].timestamp
            console.log("timeSTAAAAAAAMP", returnedTimestamp)
            console.log(bundle[0].hash)
            this.$router.push({ name: 'threadviewer', params: { name: threadName, timestamp: returnedTimestamp } })
        })
        .catch(err => {
            console.error(err)
        });
        this.threadNameInput = ""
      
      //console.log("not null anymore!!!", returnedTimestamp)
      //
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
  color: #77006d;
}
.oswald {
      font-family: "Oswald", Helvetica, Arial;
    font-size: 70px;
    margin-top: 0px;
}
</style>
