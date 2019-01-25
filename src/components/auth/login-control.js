import React from 'react';
import AuthView from './auth-view';
import AuthControl from './auth-control';
import { withRouter } from 'react-router-dom';

class Login extends React.Component {
    constructor(properties) {
        super(properties);

        this.state = {
            username: '',
            password: ''
        };

        this.onLoginFormSubmit = this.onLoginFormSubmit.bind(this);
        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
    }

    onUsernameChange(event) {
        this.setState({ username: event.target.value });
    }

    onPasswordChange(event) {
        this.setState({ password: event.target.value });
    }

    onLoginFormSubmit(event) {
        event.stopPropagation();
        event.preventDefault();
        AuthControl.authenticate(this.state.username, this.state.password, (err, res) => {
            if (err) return console.log(err.message);
            this.props.history.push('/home');
        });
    }

    render() {
        return (
            <AuthView
                action={'login'}
                onLoginFormSubmit={this.onLoginFormSubmit}
                onUsernameChange={this.onUsernameChange}
                onPasswordChange={this.onPasswordChange}
            />
        );
    }
}

export default withRouter(Login);
