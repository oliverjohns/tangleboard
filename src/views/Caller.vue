<template>
  <div class="call">
    <div>
      <p>Refresh interval</p>
      <select v-model="refreshTime" @change="onChangeRefreshTime($event)" name="refreshtime" id="refreshtime">
        <option value=0>Off</option>
        <option value=30>30s</option>
        <option value=10>10s</option>
        <option value=4>4s</option>
      </select>
    </div>
    <Test2 msg="Create a new call"/>

  </div>
</template>

<script>
// @ is an alias to /src
import Test2 from '@/components/Test2.vue'
import {globalSettings} from '../main.js'

export default {
  name: 'Call',
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
    Test2
  }
}
</script>
