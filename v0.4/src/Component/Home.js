import React, { Component } from 'react';
import { Route, BrowserRouter, Redirect, Switch, Link } from 'react-router-dom';
import $ from "jquery";
import { firebaseAuth, user } from '../ConfigFirebase/Authentication';
import Login from '../Component/Login';
import Loading from '../Component/Loading';

export default class Home extends Component {

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
                });

            } else {
                this.setState({
                    authed: false,
                    loading: false
                });
            }
        })
    }
    componentWillUnmount() {
        this.removeListener()
    }


    render() {
        return this.state.loading === true ? <Loading />
            : (<div></div>)
    }
}

