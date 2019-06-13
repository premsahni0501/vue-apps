<template>
  <div class="container-fluid">
    <ActionBar v-bind:title="'Todos'"/>
    <div class="container mt-3 home" style="max-width: 500px;">
      <AddTodo v-on:addTodo="addTodo" v-on:markCompleted="markCompleted"/>
      <Todos v-bind:todos="todoListItems" v-on:removeTodo="removeTodo"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Todos from "../components/TodoApp/Todos.vue";
import AddTodo from "../components/TodoApp/AddTodo.vue";
import ActionBar from '../components/ActionBar.vue';

import { Todo } from "../interface/Todo";

@Component({
  components: {
    Todos,
    AddTodo,
    ActionBar
  }
})
export default class TodoApp extends Vue {
  private todosList: Array<Todo> = new Array<Todo>();

  get todoListItems(): Array<Todo> {
    return this.todosList;
  }
  set todoListItems(list: Array<Todo>) {
    this.todosList = list;
  }
  private addTodo(newTodo: string) {
    const list = this.todoListItems;
    list.unshift({ value: newTodo, completed: false });
    this.todoListItems = list;
  }
  private markCompleted(todoItem: Todo) {
    const list = this.todoListItems;
    list.map((todo: Todo) => {
      if (todo.value === todoItem.value) {
        todo.completed = !todo.completed;
      }
    });
    this.todoListItems = list;
  }
  private removeTodo(todoItem: Todo) {
    let list = this.todoListItems;
    list = list.filter((todo: Todo) => {
      if (todo.value !== todoItem.value) {
        return todo;
      }
    });
    this.todoListItems = list;
  }
}
</script>
