import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card } from 'react-bootstrap'
import Error404 from './Error404';

class Answered extends Component {
    render() {
		const { question, author, authedUser } = this.props

        console.log(question)

		if (question === null) {
			return <Error404 />
		}

		const { optionOne, optionTwo } = question
		const totalVotes = optionOne.votes.length + optionTwo.votes.length

		return (
					<Card className="container center align-items-center m-3" style={{minWidth:'100%'}}>
                        <Card.Img style={{width:'100px'}} variant='top' src={author.avatarURL} alt={`avatar of ${author.avatarURL}`} />
						<Card.Body className="justify-content-center">
                        <Card.Title>{author.name} asks:</Card.Title>
                        <Card.Text>Would You Rather...</Card.Text>
							<div style={{marginTop:'20px'}}>
								<Card.Text className="text-light bg-secondary">
									{optionOne.text}
									{optionOne.votes.includes(authedUser) ? (
										<span className="mx-2 bg-danger light">
											Your Answer
										</span>
									) : null}
                                    <br />
									<span className='text-info'>
									{optionOne.votes.length} out of {totalVotes} users have Choosen this
                                    <br />
                                    {Math.round((optionOne.votes.length / totalVotes) * 100)}%
									</span>
								</Card.Text>
								<Card.Text>Or</Card.Text>
								<Card.Text className="text-light bg-secondary">
									{optionTwo.text}
									{optionTwo.votes.includes(authedUser) ? (
										<span className='mx-2 bg-danger light'>
                                            Your Answer
                                        </span>
									) : null}
                                    <br />
									<span className='text-info'>
                                    {optionTwo.votes.length} out of {totalVotes} users have Choosen this
                                    <br />
                                    {Math.round((optionTwo.votes.length / totalVotes) * 100)}%
									</span>
								</Card.Text>
							</div>
						</Card.Body>
					</Card>
		);
	}
}

function mapStateToProps({ authedUser, questions, users }, props) {

    const { id } = props

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

export default connect(mapStateToProps)(Answered)