import React from 'react'
import { useState } from 'react'
import { Form, Button, Col, Row } from 'react-bootstrap'
import styled from 'styled-components'
import Error from '../component/error'

export default function SearchBar({ home, onSubmit }) {
    const [innerValue, setInnerValue] = useState('');
    const [error, setError] = useState('');

    //handling submit
    const HandleSubmit = () => { onSubmit(innerValue) }

    //function to handle when user click enter
    const onKeyPress = (e) => {
        //when there is no error
        if (e.which === 13 && !error) {
            HandleSubmit();
        }
    }

    return (
        <Styles>
            <Row className={home ? "home-container" : "analysis-container"}>
                <Col md={8}>
                    <Form.Group>
                        <Form.Control
                            required
                            size="lg"
                            type="text"
                            placeholder="Enter a Twitter Username ex: narendramodi"
                            name="search"
                            onChange={(x) => {
                                const { value } = x.target;
                                //check if there is special chars
                                if (/[^\w]/.test(value)) {
                                    setError("There is no special characters in Twitter username. Please enter a correct username.");
                                } else if (value.length > 15) {
                                    setError("Please enter a Twitter username with less than 15 characters length.");
                                }
                                else {
                                    setError(null)
                                }
                                setInnerValue(value)
                            }}
                            onKeyPress={onKeyPress}
                        />
                    </Form.Group>
                </Col>
                <Col md={3} className="button-search">
                    {/* for search button */}
                    <Button
                        className="float-right"
                        size="md"
                        variant="info"
                        id="search-button"
                        //disable button when there is error
                        disabled={error != null}
                        onClick={HandleSubmit}
                    >Search
                    </Button>
                </Col>
                <Col md={11}>
                    {error && <Error text={error} />}
                </Col>
            </Row>
        </Styles>
    )
}


const Styles = styled.div`
.home-container{
    width:55%;
}
.form-control-lg {
    font-size: 0.8rem;
}
@media only screen and (max-width: 568px) {
    .home-container{
        width:100%;
    }
}
`