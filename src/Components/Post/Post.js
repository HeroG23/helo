import React, { Component } from "react";
import axios from "axios";
import './Post.css'
class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      author: "",
      author_pic: "",
      title: "",
      img: "",
      content: "",
      loading: true,
    };
  }
  componentDidMount() {
    axios.get(`/api/post/${this.props.match.params.id}`).then((res) => {
      setTimeout(() => this.setState({ ...res.data, loading: false }), 500);
    });
  }

  render() {
    return (
      <div className="Post content_box">
        {!this.state.loading && this.state.title ? (
          <div>
            <div className="post_header">
              <h2 className="title">{this.state.title}</h2>
              <div className="author_box">
                <p>by {this.state.author}</p>
                <img src={this.state.author_pic} alt="author" />
              </div>
            </div>
            <div className="post_content_box">
              <img
                className="post_img"
                src={this.state.img || "https://raw.githubusercontent.com/Jabinator1/simulation-3/master/assets/no_image.jpg"}
                alt="post"
              />
              <p>{this.state.content}</p>
            </div>
          </div>
        ) : !this.state.loading ? (
          <div className="oops_box">
            <h2 className="title">Oh Noooo!</h2>
            <p>Looks like we couldn't find the post!</p>
            <br/>
            <p>Our technicians will get right on that</p>
          </div>
        ) : (
          <div className="load_box">
            <div className="load_background"></div>
            <div className="load"></div>
          </div>
        )}
      </div>
    );
  }
}

export default Post;
