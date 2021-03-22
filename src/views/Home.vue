<template>
  <div class="home">
    <ThreadList msg="ThreadList"/>
    <CreateThread msg="Create a new thread"/>
  </div>
</template>
<style>
.refreshTimeSetter {
  position: fixed;
  top: 0;
  left: 0;
  width: 300px;
  padding: 10px;
}
.refreshTimeSetter p {
  float:left;
  padding: 0;
  margin: 0;
  padding-top: 2px;
}
.refreshTimeSetter select {
  float:left;
  margin-left: 15px;
}
</style>
<script>
// @ is an alias to /src
import ThreadList from '@/components/ThreadList.vue'
import CreateThread from '@/components/CreateThread.vue'
import {globalSettings} from '../main.js'

export default {
  name: 'Home',
  data: function() {
    return {
      refreshTime: globalSettings.refreshTime
    }
  },
  methods: {
    onChangeRefreshTime: function(event) {
      globalSettings.refreshTime = event.target.value
      this.refreshTime = event.target.value
    }
  },
  components: {
    ThreadList,
    CreateThread
  }
}
</script>
