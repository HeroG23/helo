import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      myPosts: true,
      posts: [],
      loading: true,
    };
  }
  componentDidMount() {
    this.getPosts();
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  getPosts = () => {
    let { search, myPosts } = this.state;
    let url = `/api/posts/${this.props.userId}`;
    if (myPosts && search) {
      url += `?mine=true&search=${search}`;
    } else if (!myPosts && search) {
      url += `?search=${search}`;
    } else if (myPosts && !search) {
      url += `?mine=true`;
    }
    axios.get(url).then((res) => {
      setTimeout(() =>
        this.setState({ posts: res.data, loading: false, search: "" })
      );
    });
  };

  reset = () => {
    let { myPosts } = this.state;
    let url = `/api/posts/${this.props.userId}`;
    if (myPosts) {
      url += `?mine=true`;
    }
    axios.get(url).then((res) => {
      this.setState({ posts: res.data, loading: false, search: "" });
    });
  };
  render() {
    let posts = this.state.posts.map((e) => {
      return (
        <Link to={`/posts/${e.post_id}`} key={e.post_id}>
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

function mapStateToProps(state) {
  return {
    userId: state.userId,
  };
}

export default connect(mapStateToProps)(Dashboard);
