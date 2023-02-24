import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Header from './Header';

const theme = {
    black: '#1c191b',
    gray: '#3b3b3b',
    white: '#F3F3F3',
    purple: '#CDB4FF',
    green: '#2bb0aa',
    yellow: '#fef7e5',
    mobile: '768px',
}

const Layout = ({ children }) => {
    return (
        <ThemeProvider theme={theme}>
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