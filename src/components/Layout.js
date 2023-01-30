import React from 'react';
import styled from 'styled-components';
import Header from './Header';

const Layout = ({ children }) => {
    return (
        <Container>
            <Header />
            <Wrapper>
                { children }
            </Wrapper>
        </Container>
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