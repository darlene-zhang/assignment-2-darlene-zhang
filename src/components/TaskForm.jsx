import { useState } from 'react';

function TaskForm({ onAddTask }) {
  const [text, setText] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedText = text.trim();

    if (!trimmedText) return;

    onAddTask(trimmedText);
    setText('');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        className="task-input"
        type="text"
        value={text}
        onChange={event => setText(event.target.value)}
        placeholder="Add a task..."
        aria-label="New task"
      />

      <button className="add-task-button" type="submit">
        Add Task
      </button>
    </form>
  );
}

export default TaskForm;