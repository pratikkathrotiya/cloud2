import React from 'react'
import styled from 'styled-components'
import Emoji from './emoji'
import { Col, Row, Image } from 'react-bootstrap'
import { MdLocationOn } from 'react-icons/md';

export default function UserProfile({ user, allsentiment }) {
    return (
        <Styles>
            {(user && allsentiment) && (
                <Row className="user-div container-fluid">
                    <Col lg={2} className="col-img">
                        <Image src={user.img} roundedCircle className="user-img" />
                    </Col>
                    <Col lg={4} className="col-text">
                        <h4>{user.name}</h4>
                        <p>@{user.screen_name}</p>
                        <p>{user.description}</p>
                        {user.location && <p><MdLocationOn /> {user.location}</p>}
                    </Col>
                    <Col lg={2} className="col-sentiment">
                        <h5>Overall Sentiment:</h5>
                    </Col>
                    <Col lg={4} className="col-sentiment">
                        <Emoji sentiment={allsentiment} userprofile={true} />
                    </Col>
                </Row>
            )}
        </Styles >
    )
}

const Styles = styled.div`
    margin-top:1%;
    .row{
        margin-right:0px;
        margin-left:0px
    }
    .user-div{
        background-color:#094067;
        padding:2%;
    }
    .col-text{
        color:white;
    }
    .col-img{
        display:flex;
        align-items:center;
        justify-content:center;
    }
    .user-img{
        width:50%
    }
    .col-sentiment{
        color:white;
        display:flex;
        align-items:center;
        justify-content:center;
    }
    p{
        font-size:80%;
    }

    @media only screen and (max-width: 768px) {
        .user-div{
            padding:2%;
        }
        .user-img{
            width:20%
        }
        .col-text{
            text-align:center;
        }
        .col-sentiment{
            text-align:center;
        }
    }
`
