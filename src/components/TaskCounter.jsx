function TaskCounter({ total, completed }) {
  return (
    <div className="task-counter" aria-label={`${total} total tasks, ${completed} completed`}>
      <span className="counter-icon" aria-hidden="true">
        ✓
      </span>
      <span>{total}/{completed}</span>
    </div>
  );
}

export default TaskCounter;