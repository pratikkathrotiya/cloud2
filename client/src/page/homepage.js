import React from 'react';
import { useState } from 'react'
import { useHistory } from "react-router-dom";
import { Jumbotron, Col } from 'react-bootstrap'
import SearchBar from '../component/searchbar'
import LoadingBar from '../component/loading'
import Error from '../component/error'
import FetchServer from '../component/fetchServer'
import styled from 'styled-components'
import wallpaper from '../img/wallpaper.jpg'

export default function HomePage() {
    const history = useHistory();
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    async function HandlingSubmit(value) {
        try {
            const postBody = { twitterId: '0' }
            const res = await FetchServer(value, postBody);
            if (res.result.usernameError) {
                setError('No username found. Please enter a correct username')
            }
            else if (res.result.serverError) {
                setError('Error Fetching Data from Server')
            }
            else {
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
            <Jumbotron fluid className="jumbo vertical-center">
                <Col sm={12} className="col-heading">
                    <br></br>
                    <h4>Just enter a Twitter username to find their tweets information easily.</h4>
                    < SearchBar home={true} onSubmit={async (value) => {
                        setError(false);
                        setLoading(true);
                        HandlingSubmit(value);
                    }} />
                    {error && <Error text={error} />}
                    {(loading && !error) && <LoadingBar text={"Please wait while we are generating the data"} />}
                </Col>
            </Jumbotron>
        </Styles>
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
    .col-heading{
        margin: 0;
        position: absolute;
        top: 35%;
        padding:3%;
    }
    h1, h4{
        color:#08545E;
        display:inline-block;
    }
    h4{
        margin-bottom:1.2%;
    }
    h1{
        margin-bottom:2%;
    }
    @media only screen and (max-width: 1366px) {
        h4{
            font-size:120%;
        }
        h1{
            font-size:200%;
        }
    }
    @media only screen and (max-width: 1024px) {
        h4{
            margin-bottom:2%;
        }
        h1{
            margin-bottom:2.5%;
        }
        .col-heading{
            top: 10%;
        }
    }
    @media only screen and (max-width: 568px) {
        .col-heading{
            top: 30%;
        }
        h4{
            margin-bottom:3%;
            font-size:90%;
        }
        h1{
            margin-bottom:3%;
            font-size:120%;
        }
        h1, h4{
            color:#08545E;
            background-color:whitesmoke;
            display:list-item;
        }
    }
`