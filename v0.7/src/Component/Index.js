import React, { Component } from 'react';
import $ from 'jquery';
import { Route, BrowserRouter, Redirect, Switch } from 'react-router-dom'
import { firebaseAuth } from '../ConfigFirebase/Authentication';
import Loading from '../Component/Loading';
import Login from '../Component/Login';
import Main from '../Component/Main';


function PrivateRoute({ component: Component, authed, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) => authed === true
                ? <Component {...props} />
                : <Redirect to={{ pathname: '/Login', state: { from: props.location } }} />}
        />
    )
}

function PublicRoute({ component: Component, authed, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) => authed === false
                ? <Component {...props} />
                : <Redirect to={{ pathname: '/Main', setState: { from: props.location } }} />}
        />
    )
}



export default class Index extends Component {

    state = {
        authed: false,
        loading: true,
    }
    componentDidMount() {
        this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    authed: true,
                    loading: false,
                })
            } else {
                this.setState({
                    authed: false,
                    loading: false
                })
            }
        })
    }
    componentWillUnmount() {
        this.removeListener()
    }


    render() {
        return this.state.loading === true ? <Loading />
            : (
                <BrowserRouter>
                    <Switch>
                        {this.state.authed
                            ? <PrivateRoute authed={this.state.authed} exact component={Main} />
                            : <PublicRoute authed={this.state.authed} exact component={Login} />}
                    </Switch>
                </BrowserRouter>
            )
    }
}