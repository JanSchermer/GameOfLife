<template>
  <v-container>
    <v-container elevation-20 class="block mt-4 mb-10 pt-1" v-for="boardList in boards" :key="boardList.title">
      <h1 class="mb-2" style="font-size: 50px">{{boardList.title}}</h1>
      <v-layout row :class="'selector ' + boardList.justify">
        <v-col cols="3" v-for="board in boardList.boards" :key="board.resolution" @click="loadBoard(board)">
          <BoardCanvas :title=board.title :height=height :width=width :resolution=board.resolution
          :items=board.items :showGrid=board.showGrid />
        </v-col>
      </v-layout>
    </v-container>
  </v-container>
</template>

<script>
import BoardCanvas from './BoardCanvas'
import Board from '../../game/board'
import Saves from '../../game/saves'
import exampleBoards from './examples'

export default {
  name: "LoadTable",
  components: {BoardCanvas},
  data: () => ({
    title: "",
    height: 300,
    width : 300,
    resolution: 6,
    items: null,
    showGrid: true,
  }),
  computed: {
    boards() {
      const boards = [];

      const newBoards = [
        {title: "15 x 15", resolution: 20, items: null, options: null, showGrid: true},
        {title: "25 x 25", resolution: 12, items: null, options: null, showGrid: true},
        {title: "50 x 50", resolution: 6, items: null, options: null, showGrid: true},
      ];
      boards.push({boards: newBoards, title: "New Boards", justify: "justify-space-around"});

      var savedBoards = [];
      const saves = Saves.getSavesSync();
      saves.forEach(save => {
        const data = Saves.loadSync(save);
        savedBoards.push({
          title: save,
          resolution: data.resolution / 3,
          items: data.items,
          options: data.options,
          showGrid: false,
          time: data.time,
        });
      });
      savedBoards = savedBoards.sort(save => (save.time));
      savedBoards = savedBoards.reverse();
      if(savedBoards.length > 0)
        boards.push({boards: savedBoards, title: "Saves"});

      boards.push({boards: exampleBoards, title: "Examples"}); 
      return boards;
    }
  },
  methods: {
    loadBoard(board) {
      Board.current = new Board(900, 900, board.resolution * 3, board.items, board.options);
      this.$router.push("/game");
    }
  },
}
</script>

<style scoped>
  .selector {
    border-top: 2px solid;
  }
  .block{
    border: 2px solid;
    border-radius: 20px;
  }
</style>