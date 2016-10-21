'use strict';

var React = require('react'),
    ReactDOM = require('react-dom'),
    Provider = require('react-redux').Provider,
    store = require('./store'),
    App = require('./components/app.component'),
    MainPage = require('./components/main-page.component'),
    Login = require('./components/login.component'),
    LoginContainer = require('./components/login-container.component'),
    SignupContainer = require('./components/signup-container.component'),
    Signup = require('./components/signup.component'),
    User = require('./components/user.component'),
    Character = require('./components/character.component'),
    router = require('react-router'),
    Router = router.Router,
    Route = router.Route,
    hashHistory = router.hashHistory,
    IndexRoute = router.IndexRoute;

var routes = (
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={MainPage} />
                <Route path="/user" component={User} />
                <Route path="/character" component={Character} />
                <Route path="/character/:_characterId" component={Character} />
            </Route> 
            <Route path="/signup" component={SignupContainer}>
                <IndexRoute component={Signup} />
            </Route>
            <Route path="/login" component={LoginContainer}>
                <IndexRoute component={Login} />
            </Route>
        </Router>
    </Provider>
);

document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(routes, document.getElementById('app'));
});