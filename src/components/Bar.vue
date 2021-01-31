<template>
  <v-app-bar dark app color="deep-purple">
      <v-toolbar-title>
        <h1>Game Of Life</h1>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <h1 id="generation" v-if="inGame">Generation: 0</h1>
      <v-spacer></v-spacer>
      <v-btn text light class="white pa-4" v-if="inGame">
        <v-icon class="mr-4">mdi-content-save</v-icon>
        Save
      </v-btn>
      <v-btn text light class="white pa-4 ml-4" v-if="inGame" @click="$router.push('load'); back = true;">
        <v-icon class="mr-4">mdi-file-upload</v-icon>
        Open / New
      </v-btn>
      <v-btn text light class="white pa-4 ml-4" v-if="back && !inGame" @click="$router.push('game')">
        <v-icon class="mr-4">mdi-arrow-right</v-icon>
        Back
      </v-btn>
      <v-btn text class="rounded-pill grey darken-4 pa-6 ml-8" href="https://github.com/JanSchermer/GameOfLife">
        <v-icon class="mr-4">mdi-github</v-icon>
        Code On GitHub
      </v-btn>
    </v-app-bar>
</template>

<script>
export default {
  data () {
    return {
      back: false,      
    }
  },

  computed: {
    inGame() {
      return this.$route.path.toLowerCase() == "/game";
    }
  }
}
</script>