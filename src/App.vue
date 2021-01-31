<template>
  <v-app>
    <Bar/>
    <v-main class="hidden-md-and-down">
      <router-view/>
    </v-main>
    <v-main class="hidden-lg-and-up text-center align-center justify-center">
      <h1>Unsupported Screen Width!</h1> <br>
      <h2>A Screen width of at least 1264px is required!</h2>
      <h2>If you are using a mobile device, please uns a desktop instead.</h2>
    </v-main>
  </v-app>
</template>

<script>
import Bar from "./components/Bar"

export default {
  name: 'App',

  components: {
    Bar,
  },  

  data: () => ({
    //
  }),
};
</script>
