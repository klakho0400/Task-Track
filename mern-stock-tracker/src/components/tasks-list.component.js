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
    if (tag === 'easy') {
      return '#28a745'; // Green color for "easy" tag
    } else if (tag === 'medium') {
      return '#ffc107'; // Yellow color for "medium" tag
    } else if (tag === 'hard') {
      return '#dc3545'; // Red color for "hard" tag
    } else {
      // Simple hash function to generate a unique color for other tags
      let hash = 0;
      for (let i = 0; i < tag.length; i++) {
        hash = tag.charCodeAt(i) + ((hash << 5) - hash);
      }
      const color = (hash & 0x00FFFFFF).toString(16).toUpperCase();
      return '#' + ('00000'.substring(0, 6 - color.length) + color);
    }
  };


  return (
    <tr>
      <td>{props.task.userassigned}</td>
      <td>{props.task.taskname}</td>
      <td>{props.task.description}</td>
      <td>{props.task.value}</td>
      <td>{reversedDatecreated}</td>
      <td>{reversedDatedeadline}</td>
      <td>
        <div className="tags-container">
          {renderTags()}
        </div>
      </td>
      <td>
        <Link to={"/edit/" + props.task._id} className="btn btn-primary mr-2">edit</Link>
        <button onClick={() => { props.deleteTask(props.task._id) }} className="btn btn-danger">delete</button>
      </td>
    </tr>
  );
}

export default class TasksList extends Component {
  constructor(props) {
    super(props);

    this.deleteTask = this.deleteTask.bind(this);
    this.handleTagFilter = this.handleTagFilter.bind(this);

    this.state = {
      tasks: [],
      sortByDeadlineAscending: true,
      selectedTag: null,
    };
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


  knapsackTaskAllocation(tasks) {
    // Sort tasks in descending order of value
    const sortedTasks = tasks.sort((a, b) => b.value - a.value);

    const numTasks = sortedTasks.length;
    const maxDeadline = Math.max(...sortedTasks.map(task => task.dateDeadline));

    // Set a reasonable upper limit for maxDeadline, e.g., 100
    const maxAllowedDeadline = 100;
    const finalMaxDeadline = Math.min(maxDeadline, maxAllowedDeadline);

    // Create a 2D array to store the maximum value for each deadline and task combination
    const dp = Array.from({ length: numTasks + 1 }, () => Array(finalMaxDeadline + 1).fill(0));

    for (let i = 1; i <= numTasks; i++) {
      for (let j = 1; j <= finalMaxDeadline; j++) {
        const currentTask = sortedTasks[i - 1];
        const valueWithCurrentTask = currentTask.dateDeadline >= j
          ? dp[i - 1][j - 1] + currentTask.value
          : dp[i - 1][j];

        dp[i][j] = Math.max(dp[i - 1][j], valueWithCurrentTask);
      }
    }

    // Backtrack to find the allocated tasks
    const allocatedTasks = [];
    let currentDeadline = finalMaxDeadline;
    for (let i = numTasks; i > 0; i--) {
      if (dp[i][currentDeadline] !== dp[i - 1][currentDeadline]) {
        allocatedTasks.push(sortedTasks[i - 1]);
        currentDeadline--;
      }
    }

    return allocatedTasks;
  }


  toggleSortByDeadline() {
    this.setState((prevState) => ({
      sortByDeadlineAscending: !prevState.sortByDeadlineAscending,
      tasks: [...prevState.tasks].sort((a, b) => {
        const dateA = new Date(a.dateDeadline);
        const dateB = new Date(b.dateDeadline);
        return prevState.sortByDeadlineAscending ? dateA - dateB : dateB - dateA;
      })
    }));
  }
  
  handleTagFilter(tag) {
    this.setState({ selectedTag: tag });
  }

  taskList() {
    const { selectedTag, tasks, showKnapsackSorted } = this.state;
    const filteredTasks = selectedTag
      ? tasks.filter(task => task.tag.includes(selectedTag))
      : tasks;

    let allocatedTasks;
    if (showKnapsackSorted) {
      allocatedTasks = this.knapsackTaskAllocation(filteredTasks);
    } else {
      allocatedTasks = filteredTasks;
    }

    return allocatedTasks.map(currenttask => {
      return <Task task={currenttask} deleteTask={this.deleteTask} key={currenttask._id} />;
    });
  }

  toggleShowKnapsackSorted() {
    this.setState(prevState => ({
      showKnapsackSorted: !prevState.showKnapsackSorted,
    }));
  }

  render() {
    const { sortByDeadlineAscending, selectedTag, showKnapsackSorted } = this.state;
    return (
      <div className="container mt-4">
        <h3>Logged Tasks</h3>
        <table className="table table-striped">
          <thead className="thead-light">
            <tr>
              <th>UserAssigned</th>
              <th>Taskname</th>
              <th>Description</th>
              <th>Value</th>
              <th>Date Created</th>
              <th>Date Deadline   <button onClick={() => this.toggleSortByDeadline()}>
          {sortByDeadlineAscending ? "↑" : "↓"}
        </button></th>
              <th>Tag</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.taskList() }
          </tbody>
        </table>
        <div className="tag-buttons">
            <button
              onClick={() => this.handleTagFilter(null)}
              className={`btn ${selectedTag === null ? "btn-primary" : "btn-light"}`}
            >
              Show All
            </button>
            <button
              onClick={() => this.handleTagFilter('easy')}
              className={`btn ${selectedTag === 'easy' ? "btn-success" : "btn-light"}`}
            >
              easy
            </button>
            <button
              onClick={() => this.handleTagFilter('medium')}
              className={`btn ${selectedTag === 'medium' ? "btn-warning" : "btn-light"}`}
            >
              medium
            </button>
            <button
              onClick={() => this.handleTagFilter('hard')}
              className={`btn ${selectedTag === 'hard' ? "btn-danger" : "btn-light"}`}
            >
              hard
            </button>
          </div>
        <div>
        {/* <button onClick={() => this.toggleShowKnapsackSorted()}>
            {showKnapsackSorted ? "Show Unsorted" : "Show Knapsack Sorted"}
          </button> */}
        </div>
      </div>
    )
  }
}