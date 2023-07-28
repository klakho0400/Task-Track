import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const EditTask = () => {
  const { id } = useParams();

  const [userassigned, setUserassigned] = useState('');
  const [taskname, setTaskname] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState(0);
  const [dateCreated, setDateCreated] = useState(new Date());
  const [dateDeadline, setDateDeadline] = useState(new Date());
  const [tag, setTag] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/tasks/' + id)
      .then(response => {
        setUserassigned(response.data.userassigned);
        setTaskname(response.data.taskname);
        setDescription(response.data.description);
        setValue(response.data.value);
        setDateCreated(new Date(response.data.dateCreated));
        setDateDeadline(new Date(response.data.dateDeadline));
        setTag(response.data.tag);
      })
      .catch(function (error) {
        console.log(error);
      });

    axios.get('http://localhost:5000/users/')
      .then(response => {
        if (response.data.length > 0) {
          setUsers(response.data.map(user => user.username));
        }
      });
  }, [id]);

  const onSubmit = (e) => {
    e.preventDefault();
    const task = {
      userassigned,
      taskname,
      description,
      value,
      dateCreated,
      dateDeadline,
      tag
    };

    console.log(task);

    axios.post('http://localhost:5000/tasks/update/' + id, task)
      .then(res => console.log(res.data))
      .catch(err =>  console.log(err));

    window.location = '/admin';
  };

  return (
    <div>
      <h3>Edit Task</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>User Assigned: </label>
          <select
            required
            className="form-control"
            value={userassigned}
            onChange={(e) => setUserassigned(e.target.value)}
          >
            {users.map((user) => (
              <option key={user} value={user}>
                {user}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Task Name: </label>
          <input
            type="text"
            required
            className="form-control"
            value={taskname}
            onChange={(e) => setTaskname(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Description: </label>
          <input
            type="text"
            required
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Value: </label>
          <input
            type="text"
            required
            className="form-control"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Date Created: </label>
          <div>
            <DatePicker selected={dateCreated} onChange={setDateCreated} />
          </div>
        </div>
        <div className="form-group">
          <label>Date Deadline: </label>
          <div>
            <DatePicker selected={dateDeadline} onChange={setDateDeadline} />
          </div>
        </div>
        <div className="form-group">
          <label>Tag: </label>
          <input
            type="text"
            required
            className="form-control"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input type="submit" value="Edit Task" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
};

export default EditTask;
