import React, { Component } from "react";
import axios from 'axios';

export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeRating = this.onChangeRating.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangeTaskComplete = this.onChangeTaskComplete.bind(this);
    this.onChangeTaskIncomplete = this.onChangeTaskIncomplete.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      rating: 0,
      email: "",
      phone: "",
      taskComplete: [],
      taskIncomplete: [],
      tasks: [], // To store the list of available tasks
    };
  }

  componentDidMount() {
    // Fetch the list of available tasks from the server
    axios.get('http://localhost:5000/tasks')
      .then(response => {
        this.setState({
          tasks: response.data,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangeRating(e) {
    this.setState({
      rating: e.target.value,
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangePhone(e) {
    this.setState({
      phone: e.target.value,
    });
  }

  onChangeTaskComplete(e) {
    const selectedTask = e.target.value;
    const updatedTaskComplete = this.state.taskComplete.includes(selectedTask)
      ? this.state.taskComplete.filter(task => task !== selectedTask)
      : [...this.state.taskComplete, selectedTask];
    
    this.setState({
      taskComplete: updatedTaskComplete,
    });
  }

  onChangeTaskIncomplete(e) {
    const selectedTask = e.target.value;
    const updatedTaskIncomplete = this.state.taskIncomplete.includes(selectedTask)
      ? this.state.taskIncomplete.filter(task => task !== selectedTask)
      : [...this.state.taskIncomplete, selectedTask];
    
    this.setState({
      taskIncomplete: updatedTaskIncomplete,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const user = {
      username: this.state.username,
      rating: this.state.rating,
      email: this.state.email,
      phone: this.state.phone,
      taskComplete: this.state.taskComplete,
      taskIncomplete: this.state.taskIncomplete,
    };

    console.log(user);

    axios.post('http://localhost:5000/users/add', user)
      .then(res => console.log(res.data));

    this.setState({
      username: "",
      rating: 0,
      email: "",
      phone: "",
      taskComplete: "",
      taskIncomplete: "",
    });
  }

  render() {
    return (
      <div>
        <h3>Create New User</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
            />
          </div>
          <div className="form-group">
            <label>Rating: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.rating}
              onChange={this.onChangeRating}
            />
          </div>
          <div className="form-group">
            <label>Email: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.email}
              onChange={this.onChangeEmail}
            />
          </div>
          <div className="form-group">
            <label>Phone: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.phone}
              onChange={this.onChangePhone}
            />
          </div>
          <div className="form-group">
            <label>Task Complete: </label>
            {this.state.tasks.map(task => (
              <div key={task._id}>
                <input
                  type="checkbox"
                  value={task._id}
                  checked={this.state.taskComplete.includes(task._id)}
                  onChange={this.onChangeTaskComplete}
                />
                <label>{task.taskname}</label>
              </div>
            ))}
          </div>
          <div className="form-group">
            <label>Task Incomplete: </label>
            {this.state.tasks.map(task => (
              <div key={task._id}>
                <input
                  type="checkbox"
                  value={task._id}
                  checked={this.state.taskIncomplete.includes(task._id)}
                  onChange={this.onChangeTaskIncomplete}
                />
                <label>{task.taskname}</label>
              </div>
            ))}
          </div>
          <div className="form-group">
            <input type="submit" value="Create User" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}
