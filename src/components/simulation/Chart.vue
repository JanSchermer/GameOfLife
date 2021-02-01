<template>
  <v-container>
    <TrendChart
      class="chart"
      :datasets="[
        {
          data: [10, 50, 20, 100, 40, 60, 80],
          smooth: true, 
          className: 'curve1',
        },
        {
          data: [10, 60, 20, 50, 40, 7, 50],
          smooth: true,
          className: 'blueCurve',
        },
        {
          data: [50, 10, 30, 70, 20, 99, 2],
          smooth: true,
          className: 'orangeCurve',
        }
      ]"
      :grid="{
        horizontalLines: true
      }"
      :labels='{
        yLabels: 5
      }' 
      :min="0">
    </TrendChart>
  </v-container>
</template>

<script>
export default {
  name: "Chart",
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>

.chart{
  .stroke {
    stroke: #1b1bd8;
    stroke-width: 5;
  }
  .curve1 {
    .fill {
      fill: #1b1bd8;
    }
    .point{
      fill: #1b1bd8;
      stroke: #1b1bd8;
    }
  }
  .blueCurve {
    .stroke {
      stroke: "";
      stroke-width: 2;
    }
  }
  .orangeCurve {
    .stroke {
      stroke: "orange";
      stroke-width: 2;
    }
  }
}
</style>