import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      img: "",
      content: "",
    };
  }
  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  submit = () => {
    if (this.props.userId) {
      axios
        .post(`/api/posts/${this.props.userId}`, this.state)
        .then((res) => this.props.history.push("/dashboard"));
    } else {
      alert("Must be logged in to create posts");
    }
  };
  render() {
    let imgSrc = this.state.img
      ? this.state.img
      : URL(
          "data:image/jpeg;base64,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"
        );
    return (
      <div className="Form">
        <h2>New Post</h2>
        <div className="Form-input">
          <p>Title</p>
          <input
            name="title"
            placeholder="Title"
            value={this.state.title}
            onChange={(e) => this.changeHandler(e)}
          />
        </div>
      </div>
    );
  }
}

export default Form;
