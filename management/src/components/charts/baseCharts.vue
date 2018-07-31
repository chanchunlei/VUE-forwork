<template>
    <div v-loading="loading" id="charts">
      <v-histogram></v-histogram>
      <v-area></v-area>
      <v-dashboard></v-dashboard>
      <v-linechart></v-linechart>
    </div>
</template>

<script>
  import Histogram from './histogram.vue'
  import Area from './area.vue'
  import Dashboard from './dashboard.vue'
  import lineChart from './lineChart.vue'
    export default {
        name: "base-charts",
        data() {
          return{
            loading: true
          }

        },
      components:{
        "v-histogram":Histogram,
        "v-area":Area,
        "v-dashboard":Dashboard,
        "v-linechart":lineChart
      },
      created(){
        this.loading = true;
      },
      mounted(){
        this.loading = false
      },
      methods: {

      }
    }
</script>

<style scoped>
   #charts{
     width: 100%;
     display: flex;
     flex-direction: row;
     flex-wrap: wrap;
     justify-content: space-around;
   }
</style>
