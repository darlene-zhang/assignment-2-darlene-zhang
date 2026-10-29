
import './App.css';
import { useState } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskCounter from './components/TaskCounter';

// Assignment 2: build the Task Manager here.
// Step 1 (after the Oct 12 class): hard-coded tasks, the five components, props.
// Step 2 (after the Oct 19 class): useState, the controlled form, toggle, delete, filtering.

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Call Mom', completed: false },
    {
      id: 2,
      text: 'Buy the new issue of Scientific American',
      completed: false
    },
    { id: 3, text: 'Return the textbook to Josie', completed: false },
    { id: 4, text: 'Buy the new album by Rake', completed: false },
    { id: 5, text: 'Buy a gift card for Dad', completed: false }
  ]);

  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeNav, setActiveNav] = useState('Inbox');

  const addTask = (text) => {
    const trimmedText = text.trim();

    if (!trimmedText) return;

    const newTask = {
      id: Date.now(),
      text: trimmedText,
      completed: false
    };

    setTasks(currentTasks => [...currentTasks, newTask]);
    setFilter('All');
    setActiveNav('Inbox');
  };

  const toggleTask = (id) => {
    setTasks(currentTasks =>
      currentTasks.map(task =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(currentTasks =>
      currentTasks.filter(task => task.id !== id)
    );
  };

  const completedCount = tasks.filter(task => task.completed).length;
  const activeCount = tasks.length - completedCount;

  const filteredTasks = tasks.filter(task => {
    const matchesFilter =
      filter === 'All' ||
      (filter === 'Active' && !task.completed) ||
      (filter === 'Completed' && task.completed);

    const matchesSearch = task.text
      .toLowerCase()
      .includes(search.trim().toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="app">
      <header className="main-header">
        <button
          className="menu-button"
          type="button"
          aria-label="Toggle sidebar"
          aria-expanded={sidebarOpen}
          onClick={() => setSidebarOpen(open => !open)}
        >
          <span className="hamburger-icon" aria-hidden="true">
            ☰
          </span>
        </button>

        <div className="search-container">
          <span className="search-icon" aria-hidden="true" />
          <input
            className="search-input"
            type="search"
            placeholder="Quick Find"
            aria-label="Search tasks"
            value={search}
            onChange={event => setSearch(event.target.value)}
          />
        </div>

        <TaskCounter
          total={tasks.length}
          completed={completedCount}
        />
      </header>

      <div className="page-layout">
        {sidebarOpen && (
          <aside className="sidebar">
            <nav aria-label="Task navigation">
              <ul className="navigation-list">
                <li
                  className={`navigation-item ${
                    activeNav === 'Inbox' ? 'active' : ''
                  }`}
                >
                  <button
                    type="button"
                    className="navigation-link"
                    onClick={() => setActiveNav('Inbox')}
                  >
                    <span className="nav-icon inbox-icon" aria-hidden="true">
                      ▱
                    </span>
                    <span>Inbox</span>
                    <span className="task-count">{activeCount}</span>
                  </button>
                </li>

                <li
                  className={`navigation-item ${
                    activeNav === 'Today' ? 'active' : ''
                  }`}
                >
                  <button
                    type="button"
                    className="navigation-link"
                    onClick={() => setActiveNav('Today')}
                  >
                    <span className="nav-icon today-icon" aria-hidden="true">
                      28
                    </span>
                    <span>Today</span>
                    <span className="task-count">{activeCount}</span>
                  </button>
                </li>

                <li
                  className={`navigation-item ${
                    activeNav === 'Upcoming' ? 'active' : ''
                  }`}
                >
                  <button
                    type="button"
                    className="navigation-link"
                    onClick={() => setActiveNav('Upcoming')}
                  >
                    <span
                      className="nav-icon upcoming-icon"
                      aria-hidden="true"
                    >
                      ▦
                    </span>
                    <span>Upcoming</span>
                  </button>
                </li>
              </ul>
            </nav>
          </aside>
        )}

        <main className="main-content">
          <section className="task-section">
            <h1>{activeNav}</h1>

            <TaskForm onAddTask={addTask} />

            <div className="task-filters" aria-label="Filter tasks">
              {['All', 'Active', 'Completed'].map((filterOption, index) => (
                <span className="filter-option" key={filterOption}>
                  {index > 0 && (
                    <span className="filter-separator" aria-hidden="true">
                      |
                    </span>
                  )}

                  <button
                    type="button"
                    className={
                      filter === filterOption ? 'filter-button active' : 'filter-button'
                    }
                    aria-pressed={filter === filterOption}
                    onClick={() => setFilter(filterOption)}
                  >
                    {filterOption}
                  </button>
                </span>
              ))}
            </div>

            {filteredTasks.length > 0 ? (
              <TaskList
                tasks={filteredTasks}
                onToggleTask={toggleTask}
                onDeleteTask={deleteTask}
              />
            ) : (
              <p className="empty-state">
                {search.trim()
                  ? 'No tasks match your search.'
                  : filter === 'Active'
                    ? 'No active tasks.'
                    : filter === 'Completed'
                      ? 'No completed tasks.'
                      : 'No tasks yet. Add a task to get started.'}
              </p>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}

export default App
