import { useState } from 'react';
import PropTypes from 'prop-types';
import { collection, addDoc } from 'firebase/firestore';

const TaskForm = ({ db }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      await addDoc(collection(db, 'tasks'), { title });
      setTitle('');
    } catch (error) {
      console.error('Error adding task:', error.message);
    }
  };

  return (
    // React component
    <form onSubmit={handleSubmit} className="container">
      <input
        type="text"
        placeholder="Enter task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="input-field" // Asegúrate de tener un estilo para el campo de entrada en tu CSS
      />
      <br />
      <button type="submit" className="login-button">
        Add Task
      </button>
    </form>

  );
};

TaskForm.propTypes = {
  db: PropTypes.object.isRequired,
};

export default TaskForm;
