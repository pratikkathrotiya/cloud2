import React from 'react'
import styled from 'styled-components'
import { Spinner } from 'react-bootstrap'

export default function LoadingBar({ text }) {
  return (
    <Styles>
      <Spinner animation="border" variant="info" size="sm" />
      <span className="loading-text">  {text}</span>
    </Styles>
  )
}

const Styles = styled.div`
.loading-text{
    color:#08545E;
    animation: blink-animation 1.5s steps(5, start) infinite;
    -webkit-animation: blink-animation 1.5s steps(5, start) infinite;
}

@keyframes blink-animation {
    to {
      visibility: hidden;
    }
  }
  @-webkit-keyframes blink-animation {
    to {
      visibility: hidden;
    }
  }
  @media only screen and (max-width: 568px) {
        background-color:white;
        display:inline-block;
        .loading-text{
            font-size:80%;
        }
  }
`