import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Header from './Header';
import {GlobalStyle, ResetStyle} from "./GlobalStyle";
import {devices} from "../config/device";

const theme = {
    black: '#1C191B',
    gray: '#3B3B3B',
    grayLight: '#cecece',
    white: '#F3F3F3',
    purple: '#c9b7f5',
    purpleDark: '#bca2f1',
    green: '#2BB0AA',
    greenLight: '#2bb0aa5c',
    yellow: '#FEF7E5',
    red: '#E46765',
    blue: '#3844c7'
};

const Layout = ({ children }) => {
    return (
        <ThemeProvider theme={theme}>
            <ResetStyle />
            <GlobalStyle />
            <Container>
                <Header />
                <Wrapper>
                    { children }
                </Wrapper>
            </Container>
        </ThemeProvider>
    );
};

const Container = styled.div`
    max-width: 1440px;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    padding: 76px;
    border: solid 2px ${props => props.theme.black};
    
    @media ${devices.mobile} {
        padding: 16px;
    }
`

const Wrapper = styled.article`
    width: 100%;
    height: 100%;
    border: solid 2px ${props => props.theme.black};
    border-top: none;
`

// const Title = styled.h2`
//     outline: solid 2px ${props => props.theme.black};
//     color: ${props => props.theme.black};
// `;

export default Layout;