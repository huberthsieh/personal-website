import * as React from "react"
import styled, { ThemeProvider } from "styled-components";
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/Layout";
import "../sass/common/_reset.sass"

const IndexPage = () => {
    return (
        <main>
            <Layout>
                <HomeContainer>
                    <Title># Hello, I am Hubert.</Title>
                    <IntroPhoto></IntroPhoto>
                    <Title>Official Website</Title>
                    <Contact>123</Contact>
                </HomeContainer>
            </Layout>
        </main>
    )
}

export default IndexPage

export const Head = () => <title>Home Page</title>

const HomeContainer = styled.div`
    height: 100%;
`;

const Title = styled.h2`
    margin: 0;
    padding: 20px 35px;
    width: 100%;
    font-size: 32px;
    border-bottom: solid 2px ${props => props.theme.black};
    text-transform: uppercase;
`;

const IntroPhoto = styled.div`
    background-image: url("https://i.pinimg.com/originals/3d/df/22/3ddf2287a2cc870b29f95120122b5da3.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    width: 100%;
    height: 0;
    padding-bottom: 41.25%;
`;

const Contact = styled.div`
    border: solid 2px red;
    margin: 0;
    padding: 20px 35px;
    width: 100%;
    font-size: 32px;
    text-transform: uppercase;
`;

