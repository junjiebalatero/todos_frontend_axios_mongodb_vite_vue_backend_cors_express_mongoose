<template>
  <div id="app">
    <h1>Todo List</h1>
    <input v-model="newTodo" @keyup.enter="addTodo" placeholder="Add a new todo" />
    <TodoList :todos="todos" @todo-deleted="removeDeletedTodo" />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

import TodoList from './components/TodoList.vue';

export default {
  components: {
    TodoList,
  },
  setup() {
    const newTodo = ref('');
    const todos = ref([]);

    const fetchTodos = async () => {
      try {
        const response = await axios.get('http://localhost:3000/todos');
        todos.value = response.data;
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    const addTodo = async () => {
      if (newTodo.value.trim() === '') return;

      try {
        const response = await axios.post('http://localhost:3000/todos', {
          text: newTodo.value,
          completed: false,
        });
        todos.value.push(response.data);
        newTodo.value = '';
      } catch (error) {
        console.error('Error creating todo:', error);
      }
    };

    const removeDeletedTodo = (deletedTodoId) => {
      // Remove the deleted todo from the local list
      todos.value = todos.value.filter((todo) => todo._id !== deletedTodoId);
    };

    onMounted(() => {
      fetchTodos();
    });

    return {
      newTodo,
      todos,
      addTodo,
      removeDeletedTodo,
    };
  },
};
</script>
