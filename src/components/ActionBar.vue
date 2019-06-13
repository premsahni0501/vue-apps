<template>
    <div class="actionbar">
        <button class="btn btn-link" v-on:click="goBack">
        <img src="../assets/icon/left-arrow.svg" alt="back" class="img-fluid">
        </button>
        <h3 class="m-0">{{title}}</h3>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class ActionBar extends Vue{
    @Prop() private title!: string;
    private goBack() {
        window.history.length > 1
        ? this.$router.back()
        : this.$router.push({ path: '/'});
    }
}
</script>
