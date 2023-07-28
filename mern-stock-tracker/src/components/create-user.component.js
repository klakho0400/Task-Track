import React, { Component } from "react";
import axios from 'axios';

export default class CreateUser extends Component{
    constructor(props){
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
        }
    }

    onChangeUsername(e){
        this.setState({
            username: e.target.value
        });
    }

    onChangeRating(e){
      this.setState({
          rating: e.target.value
      });
  }
  onChangeEmail(e){
    this.setState({
        email: e.target.value
    });
}
onChangePhone(e){
  this.setState({
      phone: e.target.value
  });
}
onChangeTaskComplete(e){
  this.setState({
      taskComplete: e.target.value
  });
}
onChangeTaskIncomplete(e){
  this.setState({
      taskIncomplete: e.target.value
  });
}

    onSubmit(e){
        e.preventDefault();
        const user = {
            username: this.state.username,
            rating: this.state.rating,
            email: this.state.email,
            phone: this.state.phone,
            taskComplete: this.state.taskComplete,
            taskIncomplete: this.state.taskIncomplete,
        }

        console.log(user);

        axios.post('http://localhost:5000/users/add',user)
        .then(res => console.log(res.data));

        
        this.setState({
            username: "",
            rating: 0,
            email: "",
            phone: "",
            taskComplete: [],
            taskIncomplete: [],
          })
    }


    render(){
        return (
            <div>
              <h3>Create New User</h3>
              <form onSubmit={this.onSubmit}>
                <div className="form-group"> 
                  <label>Username: </label>
                  <input  type="text"
                      required
                      className="form-control"
                      value={this.state.username}
                      onChange={this.onChangeUsername}
                      />
                </div>
                <div className="form-group"> 
                  <label>Rating: </label>
                  <input  type="text"
                      required
                      className="form-control"
                      value={this.state.rating}
                      onChange={this.onChangeRating}
                      />
                </div>
                <div className="form-group"> 
                  <label>Email: </label>
                  <input  type="text"
                      required
                      className="form-control"
                      value={this.state.email}
                      onChange={this.onChangeEmail}
                      />
                </div>
                <div className="form-group"> 
                  <label>Phone: </label>
                  <input  type="text"
                      required
                      className="form-control"
                      value={this.state.phone}
                      onChange={this.onChangePhone}
                      />
                </div>
                <div className="form-group"> 
                  <label>Task Complete: </label>
                  <input  type="text"
                      required
                      className="form-control"
                      value={this.state.taskComplete}
                      onChange={this.onChangeTaskComplete}
                      />
                </div>
                <div className="form-group"> 
                  <label>Task Incomplete: </label>
                  <input  type="text"
                      required
                      className="form-control"
                      value={this.state.taskIncomplete}
                      onChange={this.onChangeTaskIncomplete}
                      />
                </div>
                <div className="form-group">
                  <input type="submit" value="Create User" className="btn btn-primary" />
                </div>
              </form>
            </div>
          )
    }
}