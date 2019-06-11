<template>
  <form v-on:submit.prevent="addTodo" class="mb-3">
    <div class="input-group">
      <input type="text" class="form-control" v-model.lazy="newTodo">
      <div class="input-group-append">
        <button class="btn btn-primary">Add</button>
      </div>
    </div>
  </form>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component
export default class AddTodo extends Vue {
  newTodo: string = "";
  addTodo() {
    if (this.newTodo.length > 0) {
      console.log(this.newTodo);
      this.$emit("addTodo", this.newTodo);
      this.newTodo = "";
    }
  }
//   created() {
//     console.log("created");
//   }
//   mounted() {
//     console.log("mounted");
//   }
//   updated() {
//     console.log("updated");
//   }
//   destroyed() {
//     console.log("destroyed");
//   }
}
</script>
