import Vue from 'vue';
import VueRouter from 'vue-router';
import SimulationTable from "../components/simulation/SimulationTable";
import LoadTable from "../components/load/LoadTable";

Vue.use(VueRouter);

const routes = [
  {path: "/game", component: SimulationTable},
  {path: "/*", component: LoadTable},
]

export default new VueRouter({routes});