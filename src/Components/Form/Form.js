import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import './Form.css'

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
    const {userId} = this.props
    if (userId) {
      axios
        .post(`/api/posts`, {...this.state, userId})
        .then((res) => this.props.history.push("/dashboard"));
    } else {
      alert("Must be logged in to create posts");
    }
  };
  render() {
    let { title, img, content } = this.state;
    return (
      <div className="Form content_box">
        <h2 className="title">New Post</h2>
        <div className="form_input_box">
          <p>Title</p>
          <input
            name="title"
            placeholder="Title"
            value={title}
            onChange={(e) => this.changeHandler(e)}
          />
        </div>
        <img
          className="form_img_preview"
          src={img || "https://raw.githubusercontent.com/Jabinator1/simulation-3/master/assets/no_image.jpg"}
          alt="user's profile"
        />
        <div className="form_input_box">
          <p>Image URL:</p>
          <input
            name="img"
            placeholder="Image"
            value={img}
            onChange={(e) => this.changeHandler(e)}
          />
        </div>
        <div className="form_text_box">
          <p>Content:</p>
          <textarea
            name="content"
            placeholder="Content"
            value={content}
            onChange={(e) => this.changeHandler(e)}
          />
        </div>
        <button className="dark_button form_button" onClick={this.submit}>Post</button>
      </div>
    );
  }
}
const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Form)