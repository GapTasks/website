import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import {Provider} from 'react-redux';
import Login from './auth/login-control';
import Register from './auth/register-control';
import Home from './home/home-control';
import ProtectedRoute from './auth/protected-route';
import StackHome from './stack_home'
import store from '../store'

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div>
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                        <Route path="/stacks" component={StackHome} />
                        {
                            //<ProtectedRoute path="/home" component={Home} />
                            //<Redirect to="/home" />
                        }
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
