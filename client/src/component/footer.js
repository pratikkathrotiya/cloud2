import React from 'react'
import styled from 'styled-components'
import { MdCopyright } from "react-icons/md";
import { FaTwitter } from 'react-icons/fa'

export default function Footer() {
    const year = new Date().getFullYear();
    return (
        <Styles>
            <p><MdCopyright color="#ffffff" /> {year} with Data From <FaTwitter color="#3da9fc" /> API </p>
        </Styles>
    )
}

const Styles = styled.div`
    text-align:center;
    color:white;
    background-color: #042330;
    padding:0.5% 0 0.5% 0;
    margin-top:0%;
    p{
        margin-bottom:0px;
    }

    @media (max-width: 576px) {
        p{
            font-size:80%;
        }
    }

`