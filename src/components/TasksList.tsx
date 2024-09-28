import React, { useState } from 'react';
import { useGetTasksQuery } from '../api/tasksApi';
import { Link } from 'react-router-dom';
import { Task } from '../types/Task';
import './TasksList.css';

const TasksList: React.FC = () => {
  const { data: tasks = [] } = useGetTasksQuery();
  const [filter, setFilter] = useState<'all' | Task['status']>('all');

  const filteredTasks =
    filter === 'all' ? tasks : tasks.filter((task) => task.status === filter);

  const totalTasks = tasks.length;
  const statusCounts = tasks.reduce(
    (acc, task) => {
      acc[task.status] = (acc[task.status] || 0) + 1;
      return acc;
    },
    {} as Record<Task['status'], number>
  );

  return (
    <div>
      <div className="filter">
        <label>
          Filter by status:
          <select value={filter} onChange={(e) => setFilter(e.target.value as any)}>
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="on progress">On Progress</option>
          </select>
        </label>
      </div>
      <ul className="tasks-list">
        {filteredTasks.map((task) => (
          <li key={task.id} className="task-item">
            <Link to={`/edit/${task.id}`}>{task.text}</Link>
            <div className="task-details">
              Status: {task.status} | Date: {task.date}
            </div>
          </li>
        ))}
      </ul>
      <div className="statistics">
        <h2>Statistics</h2>
        <p>
          Pending: {statusCounts.pending}/{totalTasks}
        </p>
        <p>
          Completed: {statusCounts.completed}/{totalTasks}
        </p>
        <p>
          On Progress: {statusCounts['on progress']}/{totalTasks}
        </p>
      </div>
    </div>
  );
};

export default TasksList;
