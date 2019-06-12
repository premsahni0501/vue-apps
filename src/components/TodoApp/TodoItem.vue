<template>
  <li class="list-group-item" v-if="todoItem">
    <div class="form-group">
      <input type="checkbox" name="completed" class="form-control" 
        v-model="todoItem.completed" 
        v-on:change="markCompleted">
    </div>
    <span v-on:click="removeTodo">{{todoItem.value}}</span>
  </li>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Todo } from '../../interface/Todo';

@Component
export default class TodoItem extends Vue {
  @Prop() private todoItem!: Todo;
  markCompleted() {
    this.$emit("markCompleted", this.todoItem);
  }
  removeTodo() {
    this.$emit("removeTodo", this.todoItem);
  }
  // created() {
  //   console.log("created");
  // }
  // mounted() {
  //   console.log("mounted");
  // }
  // updated() {
  //   console.log("updated");
  // }
  // destroyed() {
  //   console.log("destroyed");
  // }
}
</script>

<style lang="scss" scoped>
.list-group-item {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: #222;

  .form-group {
    width: 2rem;
    margin: 0;
    margin-right: 1rem;
  }

  > span:hover,
  > span:focus,
  > span:active {
    text-decoration: line-through;
    cursor: pointer;
  }
}
</style>
