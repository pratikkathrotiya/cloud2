import React from 'react'
import { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useHistory } from "react-router-dom";
import styled from 'styled-components'
import SearchBar from './searchbar'
import FetchServer from './fetchServer'
import LoadingBar from './loading'
import Error from '../component/error'

export default function Heading() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const history = useHistory();

    async function HandlingSubmit(value) {
        try {
            const postBody = { twitterId: '0' }
            const res = await FetchServer(value, postBody);
            if (res.result.usernameError) {
                setError('No username found. Please enter a correct username')
            }
            else {
                setLoading(false)
                history.push({
                    pathname: `/analysis/${value}`,
                    state: { detail: res.result }
                })
            }
        } catch {
            setError('Error fetching data from server.')
        }
    }

    return (
        <Styles>
            <Row>
                <Col md={6}>
                    <h2>Analysis Result</h2>
                </Col>
                <Col md={6}>
                    <SearchBar onSubmit={async (value) => {
                        setError(false);
                        setLoading(true);
                        HandlingSubmit(value);
                    }} />
                    {(loading && !error) && <div className="div-loading"><LoadingBar text={"loading..."} /></div>}
                    {error && <div className="error-div"><Error text={error} /></div>}
                </Col>
            </Row>
        </Styles>
    )
}


const Styles = styled.div`
    .row{
        margin-right:0px;
        margin-left:0px
    }
    h2{
        font-color:#094067
    }
    .div-loading{
        padding-left:2.2%;
    }
    .error-div{
        margin-left:2%;
        padding:0%;
    }
`