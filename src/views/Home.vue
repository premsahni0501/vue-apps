<template>
  <div class="container">
    <h1>Hello World App</h1>
    <div class="row justify-content-start">
      <div class="col col-3 list-item" v-for="(app, index) in appList" v-bind:key="index">
        <router-link v-bind:to="app.link" class="appItem">
          <span class="icon-base">
            <img
              v-bind:src="require(`../assets/icon/${app.icon}`)"
              v-bind:alt="app.name"
              class="img-fluid"
            >
          </span>
          <p>{{app.name}}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { AppDetails } from "./Home.vue";
import { appDataList } from "../assets/json/appList";

@Component
export default class Home extends Vue {
  appList!: Array<AppDetails>;
  beforeCreate() {
    this.appList = appDataList;
  }
}

export interface AppDetails {
  name: string;
  icon: string;
  link: string;
}
</script>

<style lang="scss" scoped>
.container {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.appItem {
  padding: 1rem;
  transition: all 0.5s ease;
  display: inline-block;
  cursor: pointer;
  color: inherit;
  text-decoration: none;
  p {
    margin-top: 1rem;
    margin-bottom: 0;
  }
  .icon-base {
    height: 4rem;
    width: 4rem;
    display: inline-block;
    border-radius: 0.5rem;
    box-shadow: 0 0 2px #fff;
    overflow: hidden;
  }
}
.list-item {
  display: inline-block;
  margin-right: 10px;
  margin-bottom: 10px;
}
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
</style>
