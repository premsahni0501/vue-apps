<template>
    <div>
        <ul class="list-group" v-if="todos.length>0">
            <TodoItem 
                v-for="(todo, index) in todos" 
                v-bind:key="index" 
                v-bind:todoItem="todo"
                v-on:markCompleted="markCompleted"
                v-on:removeTodo="removeTodo"/>
        </ul>
        <p v-if="todos.length == 0" class="text-center">No Todos yet</p>
    </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import TodoItem from './TodoItem.vue';
import { Todo } from '../../interface/Todo';

@Component({
    components: {TodoItem}
})
export default class Todos extends Vue{
    @Prop() private todos!: Array<Todo>;
    markCompleted(todoItem: Todo){
        this.$emit("markCompleted", todoItem);
    }
    removeTodo(todoItem: Todo){
        this.$emit("removeTodo", todoItem);
    }
}
</script>