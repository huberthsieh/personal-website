import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'gatsby';

const links = [
    {
        id: 1,
        url: '/',
        text: 'HOME'
    },
    {
        id: 2,
        url: '/portfolio',
        text: 'portfolio'
    },
    {
        id: 3,
        url: '/blog',
        text: 'blog'
    },
    {
        id: 4,
        url: '/portfolio',
        text: 'CCC'
    },
    {
        id: 5,
        url: '/blog',
        text: 'DDD'
    },
    {
        id: 6,
        url: '/blog',
        text: 'EEE'
    }
]

const Header = () => {
    return (
        <CustomHeader id="header">
            {
                links.map(link => (
                    <Link key={ link.id } to={ link.url }> { link.text } </Link>
                ))
            }
        </CustomHeader>
    );
};

const CustomHeader = styled.header`
    width: 100%;
    height: auto;
    display: flex;
  
    a {
        border: solid 2px ${props => props.theme.black};
        border-bottom: none;
        width: calc(100% / 6);
        text-align: center;
        text-transform: uppercase;
        padding: 12px 24px;
        font-size: 18px;
        font-weight: 700;
        color: ${props => props.theme.black};
        text-decoration: none;
      
        &:last-child {
            background-color: ${props => props.theme.purple};
        }
      
        &:not(:last-child) {
            border-right: none;
        }
      
        &:hover {
            background-color: ${props => props.theme.purple};
        }
    }
`

export default Header;