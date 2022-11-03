import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import { connect } from 'react-redux'

class Leaderboard extends Component {
    render() {
        const { Data } = this.props
        return (
            <div className='card center align-items-center'>
                {Data.map(user => (
                    <Card className='bg-light my-2 py-2 d-block' style={{width:'400px'}} key={user.id}>
                        <Card.Img className='mb-2' style={{width:'100px'}} src={user.avatarURL} />
                        <Card.Header>{user.name}</Card.Header>
                        <Card.Text>
                        Answered Questions: {user.answeredQuestions}
                        <br />
                        Asked Questions: {user.createdQuestions}
                        <br />
                        <span className='bg-warning'>Total Score: {user.totalScore}</span>
                        </Card.Text>
                    </Card>
                ))}
            </div>
        )
    }
}

function mapStateToProps({ users }) {

    const Data = Object.values(users)
        .map((user) => ({
            id: user.id,
            name: user.name,
            avatarURL: user.avatarURL,
            answeredQuestions: Object.values(user.answers).length,
            createdQuestions: user.questions.length,
            totalScore: Object.values(user.answers).length + user.questions.length
        }))
        .sort((a, b) => a.totalScore - b.totalScore)
        .reverse()
    return {
        Data
    }
}

export default connect(mapStateToProps)(Leaderboard)
