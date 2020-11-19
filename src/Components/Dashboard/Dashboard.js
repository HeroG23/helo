import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

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
    
    axios.get(`/api/posts?myPosts=${myPosts}&userId=${this.props.userId}&search=${search}`)
    .then(res => this.setState({posts: res.data, loading: false}))
    .catch(err => console.log(err))
  }

  reset = () => {
    this.setState({search: "", loading: true})
    this.getPosts()
  }

  render() {
    let posts = this.state.posts.map((e) => {
      return (
        <Link className="post-container" to={`/posts/${e.post_id}`} key={e.post_id}>
          <div className="content-box Post-Box">
            <h3>{e.title}</h3>
            <div className="author">
              <p>by {e.username}</p>
              <img src={e.profile_pic} alt="author" />
            </div>
          </div>
        </Link>
      );
    });
    return (
      <div className="Dashboard">
        <div className="content-box dash-content">
          <div className="search">
            <input
              name="search"
              placeholder="Search"
              value={this.state.search}
              onChange={(e) => this.handleChange(e)}
              className= "Bar"
            />
            <img onClick={this.getPosts} className="search-btn" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR4uFXGq2P-n4xCz_54io58W5ojebVPJmW4pg&usqp=CAU" alt=""/>
            <button className="Btn" onClick={this.reset}>
              Reset
            </button>
          </div>
          <div className="User-use">
            <p>My Posts</p>
            <input
              type="checkbox"
              checked={this.state.myPosts}
              onChange={() =>
                this.setState({
                  myPosts: !this.state.myPosts,
                })
              }
            />
          </div>
        </div>
        <div className="content-box dash-posts">
          {!this.state.loading ? (
            posts
          ) : (
            <div className="loading">
              <div className="loader"></div>
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
