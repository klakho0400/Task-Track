import React, { Component } from "react";
import DatePicker from "react-datepicker";
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css"

export default class CreateTask extends Component{
  constructor(props){
      super(props);
      
      this.onChangeUserassigned = this.onChangeUserassigned .bind(this);
      this.onChangeTaskname = this.onChangeTaskname.bind(this);
      this.onChangeDescription = this.onChangeDescription.bind(this);
      this.onChangeValue = this.onChangeValue.bind(this);
      this.onChangeDateCreated = this.onChangeDateCreated.bind(this);
      this.onChangeDateDeadline = this.onChangeDateDeadline.bind(this);
      this.onChangeTag = this.onChangeTag.bind(this);

      this.onSubmit = this.onSubmit.bind(this);

      this.state = {
          userassigned: "",
          taskname: "",
          description: "",
          value: 0,
          dateCreated: new Date(),
          dateDeadline: new Date(),
          tag: [],
          tagInput: "",
          users: [],
      }
  }

  componentDidMount(){
  axios.get('http://localhost:5000/users/')
  .then(response => {
    if(response.data.length > 0)
    {
        this.setState({
            users: response.data.map(user => user.username),
            userassigned: response.data[0].username
        });
    }
  })
}

  onChangeUserassigned(e){
      this.setState({
          userassigned: e.target.value
      });
  }

  onChangeTaskname(e){
    this.setState({
        taskname: e.target.value
    });
}
onChangeDescription(e){
  this.setState({
      description: e.target.value
  });
}
onChangeValue(e){
this.setState({
    value: e.target.value
});
}
onChangeDateCreated(date){
this.setState({
    dateCreated: date
});
}
onChangeDateDeadline(date){
this.setState({
    dateDeadline: date
});
}
onChangeTag(e){
  this.setState({
      tagInput: e.target.value
  });
  }


  onSubmit(e){
      e.preventDefault();
      const task = {
          userassigned: this.state.userassigned,
          taskname: this.state.taskname,
          description: this.state.description,
          value: this.state.value,
          dateCreated: this.state.dateCreated,
          dateDeadline: this.state.dateDeadline,
          tag: this.state.tagInput.split(",").map(tag => tag.trim())
      }

      console.log(task);

      axios.post('http://localhost:5000/tasks/add',task)
      .then(res => console.log(res.data));

      
      window.location = '/admin';
  }


  render() {
    const inputStyle = {
      width: "100%",
      padding: "8px",
      fontSize: "16px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      marginTop: "5px",
    };

    const selectStyle = {
      width: "100%",
      padding: "8px",
      fontSize: "16px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      marginTop: "5px",
    };

    const buttonStyle = {
      width: "100%",
      padding: "10px",
      fontSize: "18px",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      marginTop: "10px",
      cursor: "pointer",
    };

    return (
      <div>
        <h3>Log New Task</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>User Assigned:</label>
            <select
              ref="userInput"
              required
              style={selectStyle}
              value={this.state.userassigned}
              onChange={this.onChangeUserassigned}
            >
              {this.state.users.map(function (user) {
                return <option key={user} value={user}>{user}</option>;
              })}
            </select>
          </div>
          <div className="form-group">
            <label>Task Name:</label>
            <input
              type="text"
              required
              style={inputStyle}
              value={this.state.taskname}
              onChange={this.onChangeTaskname}
            />
          </div>
          <div className="form-group">
            <label>Description:</label>
            <input
              type="text"
              required
              style={inputStyle}
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
          </div>
          <div className="form-group">
            <label>Value:</label>
            <input
              type="text"
              required
              style={inputStyle}
              value={this.state.value}
              onChange={this.onChangeValue}
            />
          </div>
          <div className="form-group">
            <label>Date Created:</label>
            <div>
              <DatePicker
                selected={this.state.dateCreated}
                onChange={this.onChangeDateCreated}
              />
            </div>
          </div>
          <div className="form-group">
            <label>Date Deadline:</label>
            <div>
              <DatePicker
                selected={this.state.dateDeadline}
                onChange={this.onChangeDateDeadline}
              />
            </div>
          </div>
          <div className="form-group">
            <label>Tag:</label>
            <input
              type="text"
              required
              style={inputStyle}
              value={this.state.tagInput}
              onChange={this.onChangeTag}
            />
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Log Task"
              style={buttonStyle}
            />
          </div>
        </form>
      </div>
    );
  }
}