<template>
    <div class="todo-list">
      <Todo v-for="todo in todos" :key="todo._id" :todo="todo" />
    </div>
  </template>
  
  <script>
  import Todo from './Todo.vue';
  
  export default {
    components: {
      Todo,
    },
    props: ['todos'],
  };
  </script>
  
  <style scoped>
  .todo-list {
    margin-top: 16px;
  }
  </style>
  