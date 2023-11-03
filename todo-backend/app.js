const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB (make sure your MongoDB server is running)
mongoose.connect('mongodb+srv://junjie:YOUR_PASSWORD@junjiecluster.1cawbvg.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});

const TodoSchema = new mongoose.Schema({
  text: String,
  completed: Boolean,
});

const Todo = mongoose.model('Todo', TodoSchema);

app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/todos', async (req, res) => {
  const { text, completed } = req.body;

  try {
    const newTodo = new Todo({
      text,
      completed,
    });

    const savedTodo = await newTodo.save();

    res.json(savedTodo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.put('/todos/:id', async (req, res) => {
  const todoId = req.params.id;
  const { completed } = req.body;

  try {
    // Find the todo by ID and update the 'completed' field
    const updatedTodo = await Todo.findByIdAndUpdate(
      todoId,
      { completed },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.json(updatedTodo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


app.delete('/todos/:id', async (req, res) => {
  const todoId = req.params.id;

  try {
    // Find the todo by ID and delete it
    const deletedTodo = await Todo.findByIdAndDelete(todoId);
    
    if (!deletedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
