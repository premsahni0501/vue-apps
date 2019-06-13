<template>
    <div class="container-fluid">
        <ActionBar v-bind:title="'Clock'"/>
        <div class="clockBase">
            <div class="secondsHand" v-bind:style="{transform:`rotate(${secondsHand}deg)`}"></div>
            <div class="minutesHand" v-bind:style="{transform:`rotate(${minutesHand}deg)`}"></div>
            <div class="hoursHand" v-bind:style="{transform:`rotate(${hoursHand}deg)`}"></div>
            <div class="handsBase"></div>
        </div>
        <h1 class="text-center date-text">
            <span>{{nowHrs}}:{{nowMins}}:{{nowSec}}</span>
        </h1>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import ActionBar from '../components/ActionBar.vue';

@Component({
    components: {ActionBar}
})
export default class extends Vue{
    interval: number = 0;
    secHand: number = 0;
    minHand: number = 0;
    hrHand: number = 0;

    nowSeconds: string = '';
    nowMinutes: string = '';
    nowHours: string = '';

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
    get nowHrs():string{
        return this.nowHours;
    }
    get nowMins():string{
        return this.nowMinutes;
    }
    get nowSec():string{
        return this.nowSeconds;
    }
    created(){
        this.setTime();
    }
    mounted(){
        this.interval = setInterval(()=>this.setTime(), 1000);
    }
    setTime(){
        const now: Date = new Date();

        this.nowHours = now.getHours()+'';
        this.nowMinutes = now.getMinutes()+'';
        this.nowSeconds = now.getSeconds()+'';

        this.secondsHand = (parseInt(this.nowSeconds) / 60 * 360) - 90;
        this.minutesHand = (parseInt(this.nowMinutes) / 60 * 360) - 90;
        this.hoursHand = (parseInt(this.nowHours) / 12 * 360) - 90;

        this.nowHours = (this.nowHours.toString().length == 1)?`0${this.nowHours}`:this.nowHours;
        this.nowMinutes = (this.nowMinutes.toString().length == 1)?`0${this.nowMinutes}`:this.nowMinutes;
        this.nowSeconds = (this.nowSeconds.toString().length == 1)?`0${this.nowSeconds}`:this.nowSeconds;

        console.log(this.secHand, this.nowHours, this.nowMinutes, this.nowSeconds);
    }
    beforeDestroy(){
        clearInterval(this.interval);
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
.date-text{
    span{
        padding: 1rem;
        display: inline-block;
        background: #fff;
        border-radius: 0.5rem;
        color: #222;
        font-family: monospace;
    }
}
</style>
