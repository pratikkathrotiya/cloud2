import React from 'react'
import styled from 'styled-components'
import { Col, Row, Image } from 'react-bootstrap'
import Emoji from './emoji'

export default function TweetDiv({ user, tweet }) {
    return (
        <Styles>
            {(user && tweet) && (
                <Row className="row-tweet">
                    <Col sm={3} className="col-img">
                        <Image src={user.img} roundedCircle className="user-img" />
                        <span className="user-name">@{user.screen_name}</span>
                        <p>{new Date(tweet.date).toLocaleDateString()}</p>
                    </Col>
                    <Col sm={7}>{tweet.text}</Col>
                    <Col sm={2} className="col-emoji">
                        <Emoji sentiment={tweet.sentiment} userprofile={false} />
                    </Col>
                </Row>
            )
            }
        </Styles >
    )
}

const Styles = styled.div`
    .col-img{
        vertical-align: top;
        display: inline-block;
        text-align: left;
    }
    .user-img{
        width:85%;
    }
    .row-tweet{
        background-color:white;
        padding:2%;
        margin:2%;
        border-radius: 20px;
        font-size:70%;
        text-align:justify;
    }
    p{
        font-size:70%;
    }
    .user-name{
        font-size:85%;
    }

    @media only screen and (max-width: 768px) {
        .user-img{
            width:30%;
        }
    }

    @media only screen and (max-width: 586px) {
        .user-img{
            width:15%;
        }
        .col-emoji{
            text-align:right;
        }
    }

`