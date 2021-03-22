<template>
  <div class="home">
    <router-view/>
    <span v-if="$router.currentRoute.name != 'threadviewer'" >
      <ThreadList msg="Threads"/>
      <CreateThread msg="Create a new thread"/>
    </span>
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
  methods: {},
  components: {
    ThreadList,
    CreateThread
  },
  props: {
    boardName: String
  },
  beforeMount() {
    globalSettings.boardName = this.$route.params.boardName.toUpperCase()
    globalSettings.boardAddress = globalSettings.boardName + "A".repeat(64 + 17 - globalSettings.boardName.length)
    
  }
}
</script>
