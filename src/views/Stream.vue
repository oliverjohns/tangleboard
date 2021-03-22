<template>
  <div class="AudioStream">
    <div>
      <p>Refresh interval</p>
      <select v-model="refreshTime" @change="onChangeRefreshTime($event)" name="refreshtime" id="refreshtime">
        <option value=0>Off</option>
        <option value=30>30s</option>
        <option value=10>10s</option>
        <option value=4>4s</option>
      </select>
    </div>
    <Stream msg="Streams"/>

  </div>
</template>

<script>
// @ is an alias to /src
import Stream from '@/components/Stream.vue'
import {globalSettings} from '../main.js'

export default {
  name: 'AudioStream',
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
    Stream
  }
}
</script>
