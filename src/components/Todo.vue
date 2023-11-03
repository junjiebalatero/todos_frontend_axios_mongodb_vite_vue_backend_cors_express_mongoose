<template>
  <div class="todo">
    <input type="checkbox" v-model="todo.completed" @change="toggleTodo" />
    <span :class="{ completed: todo.completed }">{{ todo.text }}</span>
    <button @click="deleteTodo">Delete</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: ['todo'],
  methods: {
    toggleTodo() {
      // Send a request to update the todo's completion status in the database
      axios.put(`http://localhost:3000/todos/${this.todo._id}`, {
        completed: !this.todo.completed,
      })
      .then(() => {
        // The completion status is updated successfully in the database
      })
      .catch(error => {
        console.error('Error updating todo:', error);
      });
    },
    deleteTodo() {
      axios.delete(`http://localhost:3000/todos/${this.todo._id}`)
        .then(() => {
          this.$emit('todo-deleted', this.todo._id);
        })
        .catch(error => {
          console.error('Error deleting todo:', error);
        });
    },
  },
};
</script>

<style scoped>
.completed {
  text-decoration: line-through;
}
.todo {
  display: flex;
  align-items: center;
  margin: 8px 0;
}
</style>
