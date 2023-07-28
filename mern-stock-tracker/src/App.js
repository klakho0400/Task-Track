import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Navbar from './components/navbar.component';
import EditTask from './components/edit-task.component';
import CreateTask from './components/create-task.component';
import CreateUser from './components/create-user.component';
import TasksList from './components/tasks-list.component';


function App() {
  return (
    <Router> 
      <div className='container'>
    <Navbar /> 
    <br/> 
        <Routes> 
            <Route path="/admin" exact element={<TasksList />} /> 
            <Route path="/edit/:id" element={<EditTask />} /> 
            <Route path="/log-task" element={<CreateTask />} /> 
            <Route path="/create-user" element={<CreateUser />} /> 
        </Routes>
        </div>
    </Router>
  );
}

export default App;