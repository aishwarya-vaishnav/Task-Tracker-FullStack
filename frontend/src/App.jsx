import React, { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // 1. Fetch existing tasks from your Java Spring Boot backend
  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/tasks');
      if (response.ok) {
        const data = await response.json();
        setTasks(data);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // 2. Handle submitting a brand new task
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const response = await fetch('http://localhost:8080/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, status: 'Todo' })
      });
      
      if (response.ok) {
        setTitle(''); // This clears the white title box!
        setDescription(''); // This clears the white description box!
        fetchTasks(); // This instantly updates your screen list!
      }
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  // 3. Handle deleting a task
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/tasks/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        fetchTasks(); 
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Task & Assignment Tracker</h1>
      
      {/* Task Creation Form */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '30px', padding: '15px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h3>Add New Task</h3>
        <input 
          type="text" 
          placeholder="Task Title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <textarea 
          placeholder="Task Description (Optional)" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', minHeight: '60px' }}
        />
        <button type="submit" style={{ padding: '10px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          Save Task
        </button>
      </form>

      {/* Task Display List */}
      <div>
        <h3>Your Current Tasks ({tasks.length})</h3>
        {tasks.length === 0 ? (
          <p style={{ color: '#777', fontStyle: 'italic' }}>No tasks found. Add one above!</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {tasks.map((task) => (
              <div key={task.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', border: '1px solid #eee', borderRadius: '6px', background: '#f9f9f9' }}>
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: '0 0 5px 0', color: '#007bff' }}>{task.title}</h4>
                  <p style={{ margin: '0', color: '#555', fontSize: '14px' }}>{task.description}</p>
                  <span style={{ display: 'inline-block', marginTop: '5px', fontSize: '12px', background: '#e2e8f0', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' }}>{task.status}</span>
                </div>
                <button onClick={() => handleDelete(task.id)} style={{ background: 'none', border: 'none', color: '#dc3545', cursor: 'pointer', padding: '5px' }}>
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;