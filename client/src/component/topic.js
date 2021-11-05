import React from 'react'
import styled from 'styled-components'
import { TagCloud } from 'react-tagcloud'
import { Col, Row } from 'react-bootstrap'
import Emoji from './emoji'


export default function TopicWordCloud({ data, count }) {
    const randomColor = {
        luminosity: 'bright',
        format: 'rgb'
    };

    return (
        data && (
            <Col lg={3} md={4}>
                <Styles>
                    <h5 className="topic-title">Topic {count + 1}</h5>
                    <Row className="cloud-word">
                        <Col sm={2}>Sentiment: </Col>
                        <Col sm={8}><Emoji sentiment={data.sentiment} /></Col>
                        <Col sm={12}>
                            <TagCloud
                                minSize={13}
                                maxSize={25}
                                tags={data.words}
                                colorOptions={randomColor}
                            />
                        </Col>
                    </Row>
                </Styles >
            </Col >
        )
    )
}


const Styles = styled.div`
padding:3%;
.topic-title{
    background-color:#D07777;
    margin-bottom:0px;
    padding:2%;
    text-align:center;
    color:#F6F6F6;
}
.cloud-word{
    background-color:#F6F6F6;
    height:300px;
    padding:3%;
    margin:0.1%;
}

`