import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from './actions/shared'
import { Route } from "react-router-dom";
import Dashboard from './components/Dashboard'
import Navigation from './components/Navigation'
import Login from './components/Login'
import NewQuestion from './components/NewQuestion'
import Leaderboard from './components/Leaderboard'
import QuestionPage from './components/QuestionPage'
import Error404 from './components/Error404';

class App extends Component {

    componentDidMount() {
        this.props.dispatch(handleInitialData())
    }

    render() {
        return (
                <div>
                        {this.props.authedUser === null
                            ? <Login />
                            : <div>
                                <Navigation />
                                    <Route exact path='/' name="Dashboard">
                                        <Dashboard />
                                    </Route>
                                    <Route path='/add' name="New Question">
                                        <NewQuestion />
                                    </Route>
                                    <Route path='/leaderboard' name="Leaderboard">
                                        <Leaderboard />
                                    </Route>
                                    <Route path='/questions/:id' component={QuestionPage} />
                                    <Route path='/error' component={Error404} />
                            </div>
                        }
                </div>
        )
    }
}

function mapStateToProps ({ authedUser, questions }) {

    return {
        authedUser,
        questions
    }
}

export default connect(mapStateToProps)(App)