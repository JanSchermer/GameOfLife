<template>
  <v-container>
    <TrendChart
      :datasets="[
        {
          data: [10, 50, 20, 100, 40, 60, 80],
          smooth: true,
          fill: true,
          showPoints: true
        }
      ]"
      :grid="{
        verticalLines: true,
        horizontalLines: true
      }"
      :labels='{
        xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        yLabels: 5
      }' 
      :min="0">
    </TrendChart>
  </v-container>
</template>

<script>
export default {
  name: "ChartTest",
  data() {
    return {

    }
  }
}
</script>