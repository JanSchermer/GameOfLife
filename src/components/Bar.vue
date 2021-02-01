<template>
  <v-app-bar dark app color="deep-purple">
      <v-toolbar-title>
        <h1>Game Of Life</h1>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <h1 id="generation" class="hidden-lg-and-down" v-if="inGame">Generation: 0</h1>
      <v-spacer></v-spacer>
      <v-btn text light class="white pa-4 hidden-lg-and-down" v-bind="attrs" v-on="on" v-if="inGame" @click="dialog = true">
        <v-icon class="mr-4">mdi-content-save</v-icon>
        Save
      </v-btn>
      
      <v-btn text light class="white pa-4 ml-4 hidden-lg-and-down" v-if="inGame" @click="$router.push('load'); back = true;">
        <v-icon class="mr-4">mdi-file-upload</v-icon>
        Open / New
      </v-btn>
      <v-btn text light class="white pa-4 ml-4 hidden-lg-and-down" v-if="back && !inGame" @click="$router.push('game')">
        <v-icon class="mr-4">mdi-arrow-right</v-icon>
        Go Back
      </v-btn>
      <v-btn text class="rounded-pill grey darken-4 pa-6 ml-8" href="https://github.com/JanSchermer/GameOfLife">
        <v-icon class="mr-4">mdi-github</v-icon>
        Code On GitHub
      </v-btn>

      <v-dialog v-model="dialog" width="500">
        <v-card style="border-radius: 10px">
          <v-card-title class="deep-purple white--text">
            <h1>Save Board</h1>
          </v-card-title>

          <v-card-text class="mt-5">
            <v-text-field
              label="Save Name"
              v-model="saveName"
              ref="name"
              :rules="nameRules"
              lazy-validation
              outlined
              class="mb-0"
            ></v-text-field>
            <span>
              This will only save the current state of your board.<br> Previus generations will never be saved!
            </span>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              text
              @click="save()"
            >
              save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-app-bar>
</template>

<script>
import Saves from "../game/saves";
export default {
  data () {
    return {
      back: false, 
      dialog: false,
      saveName: "",
      nameRules: [
        v => v.length > 2 || 'At least 3 characters!',
        v => !v.includes("<") && !v.includes(">") || "'<' and '>' are forbidden!",
        v => v.length < 11 || '10 characters maximum!',
      ],
    }
  },
  computed: {
    inGame() {
      return this.$route.path.toLowerCase() == "/game";
    }
  },
  methods: {
    save() {
      if(this.$refs.name.validate()){
        Saves.save(this.saveName);
        this.dialog = false;
      }
    }
  }
}
</script>