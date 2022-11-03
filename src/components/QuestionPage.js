import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Card, Form, Button } from 'react-bootstrap'
import { handleSaveQuestionAnswer } from '../actions/users'
import Answered from './Answered'
import Error404 from './Error404'

class QuestionPage extends Component {
    state = {
        value: ''
    }

    handleChange = () => {
        const value = document.getElementById('optionsList').value
        this.setState({ value })
    }

    handleSubmit = e => {
        e.preventDefault();
        const { question, handleSaveQuestionAnswer } = this.props
        const {value} = this.state
        handleSaveQuestionAnswer(question.id, value);
    }

    render() {
        const { users, authedUserAnsweres, question } = this.props
		if (question === null) {
			return <Error404 />
		}
        const { optionOne, optionTwo } = question
        const { value } = this.state


        return (
            <Fragment>
                {authedUserAnsweres.hasOwnProperty(question.id) ? <Answered id={question.id} /> :
                <Card className='center card conatiner align-items-center m-5'>
                    <Card.Img style={{width:'100px'}} variant='top' src={users[question.author].avatarURL} alt={`avatar of ${users[question.author].name}`} />
                    <Card.Body className='center'>
                        <Card.Title>{users[question.author].name} asks:</Card.Title>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group>
                                <Form.Label>
                                Would You Rather...
                                </Form.Label>
                                <Form.Select defaultValue='' onChange={this.handleChange} id='optionsList'>
                                    <option disabled value=''>Choose</option>
                                    <option value='optionOne'>{optionOne.text}</option>
                                    <option value='optionTwo'>{optionTwo.text}</option>
                                </Form.Select>
                            </Form.Group>
                            <Button type='submit' disabled={value === '' ? true : false} >Submit Answer</Button>
                        </Form>
                    </Card.Body>
                </Card>}
            </Fragment>
        )
    }
}

function mapStateToProps({ authedUser, questions, users }, props) {
    const { id } = props.match.params

    const authedUserAnsweres = users[authedUser].answers;
	const question = questions[id];

    return {
        authedUserAnsweres,
        question: question ? question : null,
		author: question ? users[question.author] : null,
        users,
        authedUser
    }
}

export default connect(mapStateToProps, { handleSaveQuestionAnswer })(QuestionPage)
