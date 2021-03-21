<template>
  <div class="home">
    <div>
      <p>Refresh interval</p>
      <select v-model="refreshTime" @change="onChangeRefreshTime($event)" name="refreshtime" id="refreshtime">
        <option value=0>Off</option>
        <option value=30>30s</option>
        <option value=10>10s</option>
        <option value=4>4s</option>
        <option value=2>2s</option>
      </select>
    </div>
    <ThreadList msg="ThreadList"/>
    <CreateThread msg="Create a new thread"/>
  </div>
</template>

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
