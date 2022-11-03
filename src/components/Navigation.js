import React, { Component } from 'react'
import { Image, Navbar, Nav} from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import {setAuthedUser} from '../actions/authedUser'

class Navigation extends Component {
    render() {
        const { users, authedUser } = this.props
        const handleLogout = (e) => {
            e.preventDefault()
            this.props.setAuthedUser(null)
        }
        return (
            <Navbar bg="myGradiant" variant="dark" sticky="top" expand="sm" collapseOnSelect>
                        <Image alt={`Avatar of ${users[authedUser].name}`} className='avatar' src={users[authedUser].avatarURL} />
                        <Navbar.Text>
                            Signed in as:<div className='text-light' style={{fontSize:'1.2em'}}>{authedUser}</div>
                        </Navbar.Text>
                        <Navbar.Toggle />
                        <Navbar.Collapse className="justify-content-center">
                            <Nav>
                                <NavLink style={{textDecoration:'none', color:'white'}} exact to="/" >Home</NavLink>
                                <NavLink style={{textDecoration:'none', color:'white'}} className='mx-4' to="/add">New Question</NavLink>
                                <NavLink style={{textDecoration:'none', color:'white'}} to="/leaderboard">Leaderboard</NavLink>
                            </Nav>
                        </Navbar.Collapse>
                        <Nav.Link className="text-light justify-content-end mx-5" onClick={handleLogout}>
                            Logout
                        </Nav.Link>
            </Navbar>
        )
    }
}

function mapStateToProps ({ authedUser, users }) {
    return {
        users,
        authedUser
    }
}

export default connect(mapStateToProps, {setAuthedUser})(Navigation)