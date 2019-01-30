import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import {Provider} from 'react-redux';
import styled from 'styled-components';
import Login from './auth/login-control';
import Register from './auth/register-control';
import Home from './home/home-control';
import ProtectedRoute from './auth/protected-route';
import StackHome from './stack_home';
import CreateTask from './create_task'
import FetchTask from './fetch_task'
import store from '../store';

const StyledApp = styled.div`
    display: block;
    top: 10%;
    position: relative;
`

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <StyledApp>
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                        <Route path="/stacks" component={StackHome} />
                        <Route path="/create_task/:stack_id" component={CreateTask} />
                        <Route path="/fetch_task" component={FetchTask} />
                        {
                            //<ProtectedRoute path="/home" component={Home} />
                            //<Redirect to="/home" />
                        }
                    </StyledApp>
                </Router>
            </Provider>
        );
    }
}

export default App;
