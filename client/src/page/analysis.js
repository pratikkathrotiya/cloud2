import React from 'react'
import { useState, useEffect } from 'react'
import { useLocation } from "react-router-dom"
import { Col, Row, Alert } from 'react-bootstrap'
import { FaTwitter } from 'react-icons/fa'
import styled from 'styled-components'
import FetchServer from '../component/fetchServer'
import UserProfile from '../component/userprofile'
import Heading from '../component/heading'
import TweetDiv from '../component/tweetDiv'
import TopicWordCloud from '../component/topic'
import CreateChart from '../component/chart'
import Error from '../component/error'


export default function AnalysisPage({ match }) {
    const [data, setData] = useState({});
    const [error, setError] = useState('');
    const location = useLocation();

    useEffect(() => {
        if (location.state.detail) {
            setError('')
            setData(location.state.detail);
        }
        //Fetch data from server every 1 minute
        const interval = setInterval(async () => {
            try {
                const postBody = { twitterId: sessionStorage.getItem('TwitterID') }
                const resp = await FetchServer(match.params.account, postBody);
                resp.result.serverError && setError('Error Fetching Data from Server');
                if (resp.result && !resp.result.serverError) {
                    setError('')
                    setData(resp.result);
                }
            } catch {
                setError('Unable to connect to the server. Please try again later')
            }
        }, 60000);

        return () => clearInterval(interval);

    }, [match.params.account, location.state.detail])

    //Saving Tweet ID to be sent as a body in the post request.
    useEffect(() => sessionStorage.setItem('TwitterID', data?.tweets && data.tweets[0].id), [data])

    return (
        <Styles>
            {(data) && (
                <Row className="container-analysis">
                    <Col xs={12}><Heading /></Col>
                    {error && <Col xs={12}> <Alert variant="danger"><Error text={error} /></Alert></Col>}
                    <Col xs={12}>
                        <UserProfile user={data.user} allsentiment={data.allsentiment} />
                    </Col>
                    <Col lg={4} className="col-tweets">
                        <div className="div-tweet-heading"><h5 className="title"><FaTwitter color="#3da9fc" />  Live Tweets</h5></div>
                        <div className="overflow-auto div-tweets">
                            {data.tweets && data.tweets.map((line) =>
                                <TweetDiv user={data.user} tweet={line} key={line.id} />
                            )}
                        </div>
                    </Col>
                    <Col lg={8} className="col-chart">
                        {data.monthlySentiment && <CreateChart data={data.monthlySentiment} />}
                    </Col>
                    <Col sm={12} className="wordcloud-heading">
                        {data.topics && <h3>Top Topics from Latest Tweets  <FaTwitter color="#3da9fc" /></h3>}
                    </Col>
                    <Col lg={12} >
                        <Row>
                            {data.topics?.map((topic, index) => <TopicWordCloud data={topic} count={index} key={topic.title} />)}
                        </Row>
                    </Col>
                </Row>
            )}
        </Styles >
    )
}


const Styles = styled.div`
    padding:3%;
    .container-analysis{
        padding:0px;
        margin-bottom:7%;
    }
    .col-tweets{
        padding-top:2%;
    }
    .div-tweets{
        padding:3%;
        height:460px;!important
    }
    .overflow-auto{
        background-color:#D8EEFE;!important
    }
    .title{
        text-align:center;
    }
    .wordcloud-heading{
        margin-top:2%;
        padding:2% 1%;
    }
    .col-chart{
        display:flex;
        align-items:flex-end;
        justify-content:center;
    }

    @media only screen and (min-width: 1450px) {
        padding: 4% 6% 3% 6%;
        .div-tweets{
            height:620px;!important
        }
    }
    
    @media only screen and (max-width: 586px) {
        padding:6%;
        h3{
            font-size: 120%
        }
        h5{
            font-size: 100%;
        }
        .wordcloud-heading{
            text-align:center;
            margin-top:6%;
        }
        .col-tweets{
            margin-top:6%;
        }
        .col-chart{
            margin-top:8%;
        }
    }
  
`