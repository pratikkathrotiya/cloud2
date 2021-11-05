import React from 'react'
import styled from 'styled-components'

export default function Error({ text }) {
    return (
        <Styles>
            <p className="alert">{text}</p>
        </Styles>
    )
}

const Styles = styled.div`
padding:0px;
.alert{
    color:red;
    padding:0px;
}
`