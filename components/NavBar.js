import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class NavBar extends Component {
    render() {
        return (

            <nav id='nav-bar'>
                <ul>
                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                    <li>
                        <Link to='/breedselect'>Select Breed</Link>
                    </li>
                </ul>
            </nav>
        )
    }
}