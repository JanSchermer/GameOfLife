<template>
  <v-app>
    <Bar/>
    <v-main class="hidden-lg-and-down">
      <router-view/>
    </v-main>
    <v-main class="hidden-xl-only text-center align-center justify-center">
      <v-container style="border-radius: 30px; border: 5px solid" class="pt-5 pb-10" elevation-20>
        <h1 style="font-size: 60px">Your screen is too small :(</h1> <br>
        <h2>A screen width of at least 1900px is required!</h2>
        <h2>If you are using a mobile device, try using a desktop instead.</h2>
        <h2>If you are already on a desktop, try using it in fullscreen mode.</h2>
      </v-container>
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
};
</script>
