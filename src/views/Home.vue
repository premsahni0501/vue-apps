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
    <button class="btn btn-outline-primary fixed-bottom changeBg" v-on:click="getRandomPhoto()">Change BG</button>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { AppDetails } from "./Home.vue";
import { appDataList } from "../assets/json/appList";
import Unsplash from 'unsplash-js';

@Component
export default class Home extends Vue {
  appList!: Array<AppDetails>;
  unSplash!: Unsplash;
  beforeCreate() {
    this.appList = appDataList;
    this.unSplash = new Unsplash({
      applicationId: "36492c6016a071a235ce86c031953005776cefcecae43a7ebab6736138900810",
      secret: "6281e3f99ad6b2b6c2483ed0c276ac7f0388513c3a24c8fd3f0ee2595b0891b1"
    })
  }
  getRandomPhoto(){
    this.unSplash.photos.getRandomPhoto({ featured: true })
    .then(res=>res.json())
    .then(json => {
      console.log(json);
      if(json.hasOwnProperty('links') && json['links'].hasOwnProperty('download'))
        this.$emit("changeBg", json.links.download)
    });
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
    text-shadow: 0 0 2px #fff;
  }
  .icon-base {
    padding: 1rem;
    background-color: #eee;
    height: 4rem;
    width: 4rem;
    display: inline-block;
    border-radius: 0.5rem;
    box-shadow: 0 0 2px #fff;
  }
  img {
    max-width: 2rem;
    max-height: 2rem;
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
.changeBg{
    right: 1rem;
    left: auto;
    bottom: 1rem;
}
</style>
