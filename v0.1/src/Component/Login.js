import React, { Component } from 'react'
import { logIn } from '../ConfigFirebase/Authentication'
import 'bootstrap/dist/css/bootstrap.css'

function setErrorMsg(error) {
    return {
        loginMessage: error
    }
}

export default class Login extends Component {
    state = { loginMessage: null }
    handleSubmit = (e) => {
        e.preventDefault()
        logIn (this.email.value, this.pw.value)
            .catch((error) => {
                this.setState(setErrorMsg('Invalid username/password.'))
            })
    }

    render() {
        return (
            <div>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label>Email</label>
                            <input className="form-control" ref={(email) => this.email = email} placeholder="Email" />
                        </div>
                       <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" placeholder="Password" ref={(pw) => this.pw = pw} />
                        </div>
                        <button type="submit" className="btn btn-primary">Login</button>
                    </form>
                </div>
            </div>


        )
    }
}