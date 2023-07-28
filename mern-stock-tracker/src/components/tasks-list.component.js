import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';

const Task = props => {
  const originalcreated = props.task.dateCreated.substring(0, 10);
  const [yearc, monthc, dayc] = originalcreated.split('-');
  const originaldeadline = props.task.dateDeadline.substring(0, 10);
  const [yeard, monthd, dayd] = originaldeadline.split('-');

  const reversedDatecreated = `${dayc}/${monthc}/${yearc}`;
  const reversedDatedeadline = `${dayd}/${monthd}/${yeard}`;

  const renderTags = () => {
    return props.task.tag.map((tag, index) => (
      <span
        key={index}
        className="tag rounded-pill"
        style={{
          backgroundColor: generateColorForTag(tag),
          padding: '6px 10px',
          color: 'white',
          marginRight: '10px' /* Adjust this value to control the spacing */
        }}
      >
        {tag}
      </span>
    ));
  };


  const generateColorForTag = (tag) => {
    // Simple hash function to generate a unique color for each tag
    let hash = 0;
    for (let i = 0; i < tag.length; i++) {
      hash = tag.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color = (hash & 0x00FFFFFF).toString(16).toUpperCase();
    return '#' + ('00000'.substring(0, 6 - color.length) + color);
  };


  return(
  <tr>
    <td>{props.task.userassigned}</td>
    <td>{props.task.taskname}</td>
    <td>{props.task.description}</td>
    <td>{props.task.value}</td>
    <td>{reversedDatecreated}</td>
    <td>{reversedDatedeadline}</td>
    <td>{renderTags()} &nbsp;</td>
    <td>
      <Link to ={"/edit/"+props.task._id}>edit</Link> | <a href="#" onClick={() => { props.deleteTask(props.task._id) }}>delete</a>
    </td>
  </tr>
  );
}

export default class TasksList extends Component {
  constructor(props) {
    super(props);

    this.deleteTask = this.deleteTask.bind(this)

    this.state = {tasks: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/tasks/')
      .then(response => {
        this.setState({ tasks: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteTask(id) {
    axios.delete('http://localhost:5000/tasks/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      tasks: this.state.tasks.filter(el => el._id !== id)
    })
  }

  

  taskList() {
    return this.state.tasks.map(currenttask => {
      return <Task task={currenttask} deleteTask={this.deleteTask} key={currenttask._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Logged Tasks</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>UserAssigned</th>
              <th>Taskname</th>
              <th>Description</th>
              <th>Value</th>
              <th>Date Created</th>
              <th>Date Deadline</th>
              <th>Tag</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.taskList() }
          </tbody>
        </table>
      </div>
    )
  }
}