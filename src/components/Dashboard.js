import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Tabs, Tab, Card } from 'react-bootstrap'
import Question from './Question'

class Dashboard extends Component {
    render() {
        return (
            <Card className='bg-light m-5 align-items-center'>
                <Tabs defaultActiveKey="unanswered" id="uncontrolled-tab" className="bg-light my-2 d-flex justify-content-center">
                    <Tab eventKey="answered" title="Answered" className='center'>
                        {this.props.answered.map((question) => (
                            <div key={question.id}>
                            <Question id={question.id}></Question>
                            </div>
                        ))}
                    </Tab>

                    <Tab eventKey="unanswered" title="Unanswered" className='center'>
                        {this.props.unanswered.map((question) => (
                            <div key={question.id}>
                                <Question id={question.id}></Question>
                            </div>
                        ))}
                    </Tab>
                </Tabs>
            </Card>
        )
    }
}

function mapStateToProps ({ questions, users, authedUser }) {

    const answeredIds = Object.keys(users[authedUser].answers)
    const answered = Object.values(questions)
        .filter((question) => answeredIds.includes(question.id))
        .sort((a, b) => b.timestamp - a.timestamp)

    const unanswered = Object.values(questions)
        .filter((question) => !answeredIds.includes(question.id))
        .sort((a, b) => b.timestamp - a.timestamp)

    return {
        answered,
        unanswered
    }
}

export default connect(mapStateToProps)(Dashboard)