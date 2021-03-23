<template>
  <div class="start">
    <h1 class="oswald">Choose board</h1>
    <input v-model="boardNameInput" type="text" onkeypress="return (event.charCode > 64 && event.charCode < 91) || (event.charCode > 96 && event.charCode < 123)">
    <button :disabled='boardNameInput.length > 17' v-on:click="enterBoard()">Enter</button>
  </div>
</template>

<script>
export default {
  name: 'Start',
  data: function () {
    return {
      boardNameInput: "main"
    }
  },
  methods: {
      enterBoard: function() {
          this.$router.push({ name: 'Home', params: { boardName: this.boardNameInput} })
      },
  },
  components: {}
}
</script>
<style>
.oswald {
      font-family: "Oswald", Helvetica, Arial;
    font-size: 70px;
    margin-top: 0px;
}
.start {
background-image: url("../assets/sky.gif");
  background-size:100% 100%;
  padding: 20px 50px;
  display:table;
  margin: 30px auto;
}
</style>
