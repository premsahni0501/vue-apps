<template>
  <div id="app" v-bind:style="{backgroundImage: `url(${bgLink})`}">
    <router-view v-on:changeBg="changeBg"/>
  </div>
</template>
<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
@Component
export default class App extends Vue{
  bgLink: string = "";
  created(){
    this.bgLink = localStorage.getItem("bgLink")!;
  }
  changeBg(bg: string){
      this.bgLink = bg;
      console.log(this.bgLink);
      localStorage.setItem("bgLink", this.bgLink);
  }
}
</script>

<style lang="scss">
@import "./assets/css/style.scss";
</style>
