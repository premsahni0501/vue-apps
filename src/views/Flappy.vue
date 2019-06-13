<template>
  <div 
    class="container-fluid flappyBird"
    v-on:mousedown="onPointerDown"
    v-bind:style="{backgroundPositionX:`${bgPosition}px`}">
    <ActionBar v-bind:title="'Flappy Bird'"/>
    <div class="container">
      <Bird 
        v-bind:pos="birdPosition" 
        v-bind:fps="fps"
        v-bind:gameOver="gameOver"/>
      <template v-for="(pipe, index) in pipesArray">
        <div class="pipe" v-bind:style="{left: pipe.x, top: pipe.y}" v-bind:key="`pipe_${index}`"></div>
      </template>
    </div>
    <div class="prompt fixed-top" v-if="gameOver" style="max-width: 500px;">
      <h1>{{msg}}</h1>
      <ul class="list-group">
        <li class="list-group-item" style="border: none;">
          <button class="btn btn-primary w-100" v-on:click="restartGame">Restart</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ActionBar from '../components/ActionBar.vue';
import Bird from '../components/FlappyBird/Bird.vue';

import {Vector2} from '../interface/Vector2';

@Component({
    components: {ActionBar, Bird}
})
export default class TodoApp extends Vue {
  private birdVelocity: number = 30;
  private birdGravity: number = 9;
  private birdPosition: Vector2 = { x: window.innerWidth/5, y: window.innerHeight/2 };

  private bgPosition: number = 0;
  private fps: number = 30;

  private jumpSpeed: number = 150;

  private gameOver: boolean = false;
  private msg: string = "";

  private gameInterval: number = 0;

  private pipesArray: Array<Vector2> = [
    {x: 0, y: 0}
  ];

  created(){
    this.gameInterval = setInterval(()=>this.update(), 1000/this.fps);
  }
  private update(){
    if(this.gameOver){
      return;
    }

    this.bgPosition -= this.birdVelocity/5;
    this.birdPosition.y += this.birdGravity;
    if(this.birdPosition.y > window.innerHeight || this.birdPosition.y < 0){
      this.gameOver = true;
      this.msg = "Game Over";
    }
    this.collisionDetection();
  }
  private collisionDetection(){

  }
  private goBack() {
    window.history.length>1? this.$router.back():this.$router.push({ path: '/'});
  }
  private onPointerDown(){
    if(this.gameOver){
      return;
    }
    this.birdPosition.y -= this.jumpSpeed;
  }
  private restartGame(){
    this.birdPosition.y = window.innerHeight/2;
    this.gameOver = false;
  }
}
</script>
<style lang="scss" scoped>
.flappyBird{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  user-select: none;
  z-index: 10;
  background: url('../assets/img/bg.jpg') repeat-x center center/cover;
  transition: background-position-x 0.5s linear;
  .container{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    max-width: 100%;
    margin: 0;
  }
  .actionbar{
    position: absolute;
    z-index: 11;
    padding-right: 1rem;
    opacity: 0.5;
  }
  .actionbar:hover{
    opacity: 0.8;
  }
}
.prompt{
  width: 500px;
  left: calc(50% - 250px);
  top: 10vh;
  background-color: #fff;
  border: 4px solid #aaa;
  border-radius: 1rem;
  overflow: hidden;
  padding: 1rem;
  .list-group{
    .btn{
      font-weight: 600;
      font-size: 2rem;
    }
  }
}
.pipe{
  height: 100vh;
  width: 20%;
  position: absolute;
  left: 50%;
  top: -50%;
  z-index: 10;
  background-color: #c54545;
  border: 4px solid #6b1f1f;
}
</style>
