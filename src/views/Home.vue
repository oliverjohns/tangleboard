<template>
  <div class="home">
    <ThreadList msg="Threads"/>
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
