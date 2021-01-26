<template>
  <v-app>
    <v-app-bar dark app color="deep-purple">
      <v-toolbar-title>
        <h1>Game Of Life</h1>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text light class="white pa-4">
        <v-icon class="mr-4">mdi-content-save</v-icon>
        Save
      </v-btn>
      <v-btn text light class="white pa-4 ml-4">
        <v-icon class="mr-4">mdi-file-upload</v-icon>
        Open / New
      </v-btn>
      <v-btn text class="rounded-pill grey darken-4 pa-6 ml-8" href="https://github.com/JanSchermer/GameOfLife">
        <v-icon class="mr-4">mdi-github</v-icon>
        Code On GitHub
      </v-btn>
    </v-app-bar>
    <v-main class="hidden-md-and-down">
      <SimulationTable class="mt-6"/>
    </v-main>
    <v-main class="hidden-lg-and-up text-center align-center justify-center">
      <h1>Unsupported Screen Width!</h1> <br>
      <h2>A Screen width of at least 1264px is required!</h2>
      <h2>If you are using a mobile device, please uns a desktop instead.</h2>
    </v-main>
  </v-app>
</template>

<script>
import SimulationTable from "./components/SimulationTable"

export default {
  name: 'App',

  components: {
    SimulationTable,
  },

  data: () => ({
    //
  }),
};
</script>
