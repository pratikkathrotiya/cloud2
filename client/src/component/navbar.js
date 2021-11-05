import React from 'react'
import { Navbar } from 'react-bootstrap'
import logo from '../img/logo.jpg'

export default function NavBar() {
    return (
        <Navbar>
            <Navbar.Brand href="/">
                <img
                    alt=""
                    src={logo}
                    width="30"
                    height="25"
                    className="d-inline-block align-top"
                />{' '}
                    TwitterFeel
                    </Navbar.Brand>
        </Navbar>
    )
}