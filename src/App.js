import React, { useState } from 'react';
import { NavLink, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import BlogPosts from './BlogPosts/BlogPost1';
import BookCatalog from './BookCatagory/BookCatalog';
import FileExplorer from './FileExplorer/FileExplorer';
import JobBoard from './JobBoard/JobBoard';
import ModalDialog from './Modal/ModalDialog';
import ModalDialogWithCreatePortal from './Modal/ModalDialogWithPortal'
import Tabs from './Tabs/Tabs';
import TaskList from './Task/TaskList';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);

  const openModal2 = () => setIsModalOpen2(true);
  const closeModal2 = () => setIsModalOpen2(false);

  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">

          <ul className="nav-list">
          <li className="nav-item">
              <NavLink to="/" className="nav-gin" activeClassName="active-link">
                Gin's Practice
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/job-board" className="nav-link" activeClassName="active-link">
                Job Board
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/task-list" className="nav-link" activeClassName="active-link">
                Task List
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/book-cat" className="nav-link" activeClassName="active-link">
                Book Catalog
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/blog-post" className="nav-link" activeClassName="active-link">
                Blog Post
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/tab" className="nav-link" activeClassName="active-link">
                Tabs
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/file-explorer" className="nav-link" activeClassName="active-link">
                File Explorer
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="content">
          <Routes>
            <Route path="/job-board" element={<JobBoard />} />
            <Route path="/task-list" element={<TaskList />} />
            <Route path="/book-cat" element={<BookCatalog />} />
            <Route path="/blog-post" element={<BlogPosts />} />
            <Route path="/tab" element={<Tabs />} />
            <Route path="/file-explorer" element={<FileExplorer />} />
          </Routes>
          <div>
      <button onClick={openModal} className="btn btn-primary" >Open Modal</button>
      {/* Conditionally render the ModalDialog */}
      {isModalOpen && (
        <ModalDialog title="Modal Dialog" onClose={closeModal}/>

      )}
       <button onClick={openModal2} className="btn btn-primary" >Open Modal 2</button>
      {/* Conditionally render the ModalDialog */}
      {isModalOpen2 && (
        <ModalDialogWithCreatePortal title="Modal Dialog 2" onClose={closeModal2}/>

      )}
    </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
