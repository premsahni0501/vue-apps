<template>
    <div class="container-fluid">
        <div class="actionbar">
            <button class="btn btn-link" v-on:click="back">
                <img src="../assets/icon/left-arrow.svg" alt="back" class="img-fluid">
            </button>
            <h3 class="m-0">Calculator</h3>
        </div>
        <div class="clockBase">
            <div class="secondsHand" v-bind:style="{transform:`rotate(${secondsHand}deg)`}"></div>
            <div class="minutesHand" v-bind:style="{transform:`rotate(${minutesHand}deg)`}"></div>
            <div class="hoursHand" v-bind:style="{transform:`rotate(${hoursHand}deg)`}"></div>
            <div class="handsBase"></div>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class extends Vue{
    interval: number = 0;
    secHand: number = 0;
    minHand: number = 0;
    hrHand: number = 0;
    get secondsHand():number{
        return this.secHand;
    }
    get minutesHand():number{
        return this.minHand;
    }
    get hoursHand():number{
        return this.hrHand;
    }
    set secondsHand(sec: number){
        this.secHand = sec;
    }
    set minutesHand(min: number){
        this.minHand = min;
    }
    set hoursHand(hr: number){
        this.hrHand = hr;
    }
    created(){
        this.setTime();
    }
    mounted(){
        this.interval = setInterval(()=>this.setTime(), 1000);
    }
    setTime(){
        const now: Date = new Date();
        this.secondsHand = (now.getSeconds() / 60 * 360) - 90;
        this.minutesHand = (now.getMinutes() / 60 * 360) - 90;
        this.hoursHand = (now.getHours() / 12 * 360) - 90;
        console.log(this.secHand, now.getHours(), now.getMinutes(), now.getSeconds());
    }
    beforeDestroy(){
        clearInterval(this.interval);
    }
    back(){
        window.history.length>1?this.$router.back():this.$router.push({path: "/"});
    }
}
</script>
<style scoped lang="scss">
.clockBase{
    width: 300px;
    height: 300px;
    border-radius: 150px;
    border: 2px solid #666;
    position: relative;
    margin: 1rem auto;
    background-color: #ddd;

    .handsBase{
        position: absolute;
        width: 16px;
        height: 16px;
        background-color: #222;
        border-radius: 8px;
        top: calc(50% - 8px);
        left: calc(50% - 8px);
        z-index: 4;
    }
    .secondsHand,
    .minutesHand,
    .hoursHand{
        position: absolute;
        width: 45%;
        height: 4px;
        background-color: #666;
        border-radius: 2px;
        top: 50%;
        left: 50%;
        transform: rotate(0);
        transform-origin: 0;
    }
    .minutesHand{
        height: 6px;
        border-radius: 3px;
        width: 40%;
        // top: calc(50% - 3px);
        // left: calc(50% - 3px);
    }
    .hoursHand{
        height: 8px;
        border-radius: 4px;
        width: 35%;
        // top: calc(50% - 4px);
        // left: calc(50% - 4px);
    }
}
</style>
