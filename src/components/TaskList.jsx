import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

const TaskList = ({ db }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const querySnapshot = await getDocs(collection(db, 'tasks'));
      setTasks(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };

    fetchTasks();
  }, [db]);

  const deleteTask = async (id) => {
    try {
      await deleteDoc(doc(db, 'tasks', id));
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error.message);
    }
  };

  return (
    // React component
    <div className="container">
      <h2 className="login-title">Task List</h2>
      <ul className="list">
        {tasks.map((task) => (
          <li key={task.id} className="list-item">
            {task.title}
            <br />
            <button
              onClick={() => deleteTask(task.id)}
              className="login-button"
            >
              Delete
            </button>
            <br /><br />
          </li>
        ))}
      </ul>
    </div>

  );
};

TaskList.propTypes = {
  db: PropTypes.object.isRequired,
};

export default TaskList;
