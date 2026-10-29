function TaskItem({ task, onToggleTask, onDeleteTask }) {
  const checkboxId = `task-${task.id}`;

  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      <input
        id={checkboxId}
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggleTask(task.id)}
        aria-label={`Mark "${task.text}" as ${
          task.completed ? 'incomplete' : 'complete'
        }`}
      />

      <label htmlFor={checkboxId}>{task.text}</label>

      <button
        className="delete-task-button"
        type="button"
        onClick={() => onDeleteTask(task.id)}
        aria-label={`Delete ${task.text}`}
        title="Delete task"
      >
        ×
      </button>
    </li>
  );
}

export default TaskItem;