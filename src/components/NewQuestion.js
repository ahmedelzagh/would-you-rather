import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Card, Button } from 'react-bootstrap'
import { handleSaveQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom'

export class NewQuestion extends Component {
    state = {
        optionOneText: '',
        optionTwoText: '',
        toHome: false
    }

    handleChange = () => {

        const optionOne = document.getElementById('optionOne').value
        const optionTwo = document.getElementById('optionTwo').value

        this.setState(() => ({
            optionOneText: optionOne,
            optionTwoText: optionTwo
        }))
    }
    handleSubmit = (e) => {
        e.preventDefault()

        const { optionOneText, optionTwoText } = this.state
        const { dispatch, authedUser } = this.props

        dispatch(handleSaveQuestion(optionOneText, optionTwoText, authedUser))

        this.setState(() => ({
            optionOneText: '',
            optionTwoText: '',
            toHome: true
        }))
    }


    render() {
        const { optionOneText, optionTwoText, toHome } = this.state

        if(toHome === true) {
            return <Redirect exact to='/' />
        }

        return (
            <Card className='m-5 center'>
                <Form className='m-4 mb-0' onSubmit={this.handleSubmit}>
                    <Form.Text>Would You Rather</Form.Text>
                    <Form.Control id="optionOne" placeholder="Enter the First Option" type="text" value={optionOneText} required onChange={this.handleChange}/>
                    <Form.Text>OR</Form.Text>
                    <Form.Control id="optionTwo" placeholder="Enter the Second Option" type="text" value={optionTwoText} required onChange={this.handleChange}/>
                    <Button className="btn btn-primary" id="submit" type="submit">Create</Button>
                </Form>
            </Card>
        )
    }
}

function mapStateToProps({ authedUser }) {
    return {
        authedUser
    }
}

export default connect(mapStateToProps)(NewQuestion)
