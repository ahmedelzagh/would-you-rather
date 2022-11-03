import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export class Question extends Component {
    render() {
        const { users, question } = this.props
        return (
            <Card className='my-2 align-items-center'>
                <Card.Img style={{width:'100px'}} variant='top' src={users[question.author].avatarURL} alt={`avatar of ${users[question.author].name}`} />
                <Card.Body>
                    <Card.Title>{this.props.users[question.author].name} asks:</Card.Title>
                    <Card.Text>Would You Rather</Card.Text>
                    <Card.Text>
                        {question.optionOne.text} <span style={{fontSize:'1.4em'}}>Or</span> {question.optionTwo.text} ??
                    </Card.Text>
                    <Link to={`/questions/${question.id}`}><Button>Open Question</Button></Link>
                </Card.Body>
            </Card>
        )
    }
}

function mapStateToProps ({ users, questions }, {id}) {
    const question = questions[id]
    return {
        users,
        question
    }

}

export default connect(mapStateToProps)(Question)
