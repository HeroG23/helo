import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import './Dashboard.css'

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      search: "",
      myPosts: true,
      posts: [],
      loading: true,
    };
  }
  componentDidMount() {
    this.getPosts()
  }

  handleChange = e => this.setState({[e.target.name]: e.target.value})

  getPosts = () => {
    let { search, myPosts } = this.state;
    let url = '/api/posts';
    if (myPosts && !search) {
      url += '?mine=true';
    } else if (!myPosts && search) {
      url += `?search=${search}`;
    } else if (myPosts && search) {
      url += `?mine=true&search=${search}`;
    }
    axios.get(url)
      .then(res => {
        setTimeout(_ => this.setState({ posts: res.data, loading: false }), 500)
      })
  }

  reset = () => {
    let { myPosts } = this.state;
    let url = '/api/posts';
    if (myPosts) {
      url += '?mine=true';
    }
    axios.get(url)
      .then(res => {
        this.setState({ posts: res.data, loading: false, search: '' })
      })
  }

  render() {
    let posts = this.state.posts.map((e) => {
      return (
        <Link to={`/posts/${e.post_id}`} key={e.post_id}>
          <div className="content_box dash_post_box">
            <h3>{e.title}</h3>
            <div className="author_box">
              <p>by {e.username}</p>
              <img src={e.profile_pic} alt="author" />
            </div>
          </div>
        </Link>
      );
    });
    return (
      <div className="Dash">
        <div className="content_box dash_filter">
          <div className="dash_search_box">
            <input
              name="search"
              placeholder="Search by Title"
              value={this.state.search}
              onChange={(e) => this.handleChange(e)}
              className= "dash_search_bar"
            />
            <img onClick={this.getPosts} className="dash_search_button" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR4uFXGq2P-n4xCz_54io58W5ojebVPJmW4pg&usqp=CAU" alt=""/>
            <button className="dark_button" id="dash_reset" onClick={this.reset}>
              Reset
            </button>
          </div>
          <div className="dash_check_box">
            <p>My Posts</p>
            <input
              type="checkbox"
              checked={this.state.myPosts}
              onChange={() =>
                this.setState({
                  myPosts: !this.state.myPosts}, 
                  this.getPosts)}
            />
          </div>
        </div>
        <div className="content_box dash_posts_container">
          {!this.state.loading ? (
            posts
          ) : (
            <div className="load_box">
              <div className="load_background"></div>
              <div className="load"></div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(Dashboard);
