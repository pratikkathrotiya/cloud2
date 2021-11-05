import React from 'react';
import { Jumbotron, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import wallpaper from '../img/wallpaper.jpg'

export default function NoMatchPage() {
    return (
        <Styles>
            <Jumbotron fluid className="jumbo vertical-center">
                <Col sm={12} className="col-text">
                    <h3>No site found. Please return to our <Link to="/">Home Page </Link></h3>
                </Col>
            </Jumbotron>
        </Styles >
    )
}

const Styles = styled.div` 
    .jumbo{
        background-image: url(${wallpaper});
        background-attachment: fixed;
        background-position: right;
        background-repeat: no-repeat;
        background-size: cover;
        margin-bottom:0px;
    }
    .vertical-center {
        min-height: 100vh;
        display: flex;
        align-items: top;
    }
    .col-text{
        margin: 0;
        position: absolute;
        top: 45%;
    }


    @media only screen and (max-width: 568px) {
        h3{
            margin-bottom:3%;
            font-size:100%;
        }
    }
`