import 'regenerator-runtime/runtime'
import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import {Provider} from 'react-redux';
import styled from 'styled-components';
import Login from './auth/login-control';
import Register from './auth/register-control';
import Home from './home/home-control';
import ProtectedRoute from './auth/protected-route';
import StackHome from './stack_home';
import CreateTask from './create_task'
import FetchTask from './fetch_task'
import SearchResults from './search_results'
import Friends from './friends';
import store from '../store';

const StyledApp = styled.div`
    display: block;
    position: relative;
    height: 100%;
    background: 
`

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <StyledApp>
                        <Switch>
                            <Route path="/login" component={Login} />
                            <Route path="/register" component={Register} />
                            <Route path="/stacks" component={StackHome} />
                            <Route path="/create_task" component={CreateTask} />
                            <Route path="/create_stacktask/:stackId" component={CreateTask} />
                            <Route path="/fetch_task" component={FetchTask} />
                            <Route path="/search_results" component={SearchResults} />
                            <Route path="/friend_stack/:friend" component={StackHome} />
                            <Route path="/friends" component={Friends} />
                            <ProtectedRoute path="/home" component={StackHome} />
                            <Redirect to="/home" />
                        </Switch>
                    </StyledApp>
                </Router>
            </Provider>
        );
    }
}

export default App;
