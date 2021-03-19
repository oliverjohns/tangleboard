<template>
  <div class="home">
    <CreateThread msg="Create a new thread"/>
    <ThreadList msg="ThreadList"/>
  </div>
</template>

<script>
// @ is an alias to /src
import ThreadList from '@/components/ThreadList.vue'
import CreateThread from '@/components/CreateThread.vue'

export default {
  name: 'Home',
  components: {
    ThreadList,
    CreateThread
  }
}
</script>
