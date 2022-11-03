import React, { Component } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'

class Login extends Component {
    state = {
        value: ''
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { setAuthedUser } = this.props
        const authedUser = this.state.value

        new Promise((res) => {
            setTimeout(() => res(), 400)
        })
        .then(() => setAuthedUser(authedUser))
    }

    handleChange = () => {
        const value = document.getElementById('userslist').value
        this.setState({ value })
    }

    render() {
        const { value } = this.state
        return (
            <Container>
                <Form className="center card container mt-4" onSubmit={this.handleSubmit}>
                    <Form.Text className="pb-4">You Need To be Signed in to Continue...</Form.Text>
                    <Form.Group controlId="selectUser">
                        <Form.Label>
                            Select A User:
                        </Form.Label>
                        <Form.Select defaultValue='' onChange={this.handleChange} name='chooseUser' className='users-list' id='userslist'>
                        <option disabled value=''>Choose a User</option>
                        {this.props.users.map(user => (
                            <option key={user.id} value={user.id}>{user.name}</option>
                        ))}
                        </Form.Select>
                    </Form.Group>
                    <Button className="btn-primary" id="submit" type="submit" disabled={value === '' ? true : false}>Login</Button>
                </Form>
            </Container>
        )
    }
}

function mapStateToProps ({ users }) {
    return {
        users: Object.values(users)
    }
}

export default connect(mapStateToProps, {setAuthedUser})(Login)