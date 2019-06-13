<template>
    <div v-bind:style="birdStyle"
        alt="bird" class="bird"></div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

import {Vector2} from '../../interface/Vector2';

@Component
export default class Bird extends Vue {
    @Prop() pos!: Vector2;
    @Prop() fps!: number;
    @Prop() gameOver!: boolean;
    private spriteFps: number = 8;
    private birdWidth: number = 598;
    private birdHeight: number = 402;
    private birdScale: number = 0.25;
    private spritePosX: number = 0;
    private currFrame: number = 0;
    private numberOfFrames: number = 4;
    
    private gameInterval: number = 0;

    get birdPos():Vector2{
        return {
            x: this.pos.x - this.birdWidth/2, 
            y: this.pos.y - this.birdHeight/2
        }
    }
    get bgPosX(): number{
        return this.spritePosX - this.currFrame * this.birdWidth;
    }
    get birdStyle():Object{
        return {
            top: `${this.birdPos.y}px`, 
            left: `${this.birdPos.x}px`,
            transform: `scale(${this.birdScale})`,
            backgroundPositionX: `${this.bgPosX}px`
        }
    }
    created(){
        this.gameInterval = setInterval(()=>this.update(), 1000/this.fps);
    }
    private update(){
        if(this.gameOver){
            return;
        }
        this.spriteFps++;
        if(this.spriteFps>this.fps/4){
            this.currFrame++;
            if(this.currFrame > this.numberOfFrames-1){
                this.currFrame = 0;
            }
            this.spriteFps = 0;
        }
    }
}
</script>
<style lang="scss" scoped>
.bird{
    display: block;
    position: absolute;
    width: 598px;
    height: 402px;
    background: url('../../assets/img/flappy1.png') no-repeat;
    background-position: 0 0;
    transition: top 0.1s ease;
}
</style>
