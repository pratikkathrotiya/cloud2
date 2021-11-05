import React from 'react'
import styled from 'styled-components'
import { Col } from 'react-bootstrap'
import { IconContext } from "react-icons";
import { RiEmotionLaughFill, RiEmotionNormalFill, RiEmotionUnhappyFill } from 'react-icons/ri';

export default function Emoji({ sentiment, userprofile }) {
    return (
        <Styles>
            <IconContext.Provider value={userprofile ? { color: '#ffcc4d', size: '40px' } : { color: '#ffcc4d', size: '28px' }} >
                {(sentiment.positive !== undefined || sentiment === 'positive') && (
                    <Col className="div-sentiment">
                        <RiEmotionLaughFill />
                        {sentiment.positive !== undefined && <span className="caption">{Math.round(sentiment.positive * 100)}%</span>}
                    </Col>
                )}
                {(sentiment.neutral !== undefined || sentiment === 'neutral') && (
                    <Col className="div-sentiment">
                        <RiEmotionNormalFill />
                        {sentiment.neutral !== undefined && <span className="caption">{Math.round(sentiment.neutral * 100)}%</span>}
                    </Col>
                )}
                {(sentiment.negative !== undefined || sentiment === 'negative') && (
                    <Col className="div-sentiment">
                        <RiEmotionUnhappyFill />
                        {sentiment.negative !== undefined && <span className="caption">{Math.round(sentiment.negative * 100)}%</span>}
                    </Col>
                )}
            </IconContext.Provider>
        </Styles >

    )
}


const Styles = styled.div`
.div-sentiment{
    vertical-align: top;
    display: inline-block;
    text-align: center;
    width: 110px;

}
.caption {
    display: block;
    color:white;
}
`