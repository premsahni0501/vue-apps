<template>
  <div class="container-fluid">
    <div class="actionbar">
      <button class="btn btn-link" v-on:click="back">
        <img src="../assets/icon/left-arrow.svg" alt="back" class="img-fluid">
      </button>
    </div>
    <div class="container">
      <h1>404</h1>
      <p>Page not found</p>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component} from 'vue-property-decorator';

@Component
export default class NotFound extends Vue{
    created(){
        console.log(this.$router);
    }
    back(){
        this.$router.push({path: "/"});
    }
}
</script>
