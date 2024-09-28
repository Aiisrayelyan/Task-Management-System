import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation  } from 'react-router-dom';
import TasksList from './components/TasksList';
import AddTask from './components/AddTask';
import EditTask from './components/EditTask';
import './App.css';
import './index.css';

function App() {
  return (
    <div>
      <Router>
        <Navigation />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<TasksList />} />
            <Route path="/add" element={<AddTask />} />
            <Route path="/edit/:id" element={<EditTask />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

const Navigation: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="nav">
      <Link
        to="/"
        className={location.pathname === '/' ? 'active' : undefined}
      >
        Tasks
      </Link>
      {' | '}
      <Link
        to="/add"
        className={location.pathname === '/add' ? 'active' : undefined}
      >
        Add Task
      </Link>
    </nav>
  );
};

export default App;
