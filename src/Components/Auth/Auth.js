import React, { Component } from 'react'
import {connect} from 'react-redux';
import axios from 'axios';

import {updateUser} from '../../redux/reducer';

class Auth extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
        }
    }
    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

      login = (e) =>{
          e.preventDefault();
          axios.post('auth/login', this.state)
            .then(res => {
                this.props.updateUser(res.data);
                this.props.history.push('/dashboard');
            }).catch(err => alert(err.response.request.response))
      }
      register = (e) =>{
          e.preventDefault();  
          axios.post('/auth/register', this.state)
          .then (res => {
              this.props.updateUser(res.data);
              this.props.history.push('/dashboard');
          }).catch(err => alert(err.response.request.response))
      }
    render() {
        const {username, password} = this.state
        return (
            <div className="Auth">
                <div className="Auth-Container">
                    <img src="" alt='logo'/>
                    <h1 className="Auth-Title">Helo</h1>
                    <div className="User-Input">
                        <p>Username:</p>
                        <input 
                            name="username"
                            value={username}
                            placeholder="Username"
                            onChange={e => this.changeHandler(e)}
                        />
                    </div>
                    <div className="User-Input">
                        <p>Password:</p>
                        <input 
                            name="password"
                            value={password}
                            placeholder="Password"
                            onChange={e => this.changeHandler(e)}
                        />
                    </div>
                    <div className="Auth-Buttons">
                        <button className="Auth-Btn" onClick={this.login}>Login</button>
                        <button className="Auth-Btn" onClick={this.register}>Register</button>
                    </div>
                </div>
                
            </div>
        )
    }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, {updateUser})(Auth)
