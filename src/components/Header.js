import React, { useState } from 'react';
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
        text: 'PORTFOLIO'
    },
    {
        id: 3,
        url: '/blog',
        text: 'BLOG'
    }
]



const Header = () => {

    // const [index, setIndex] = useState(0);

    // const activeHandler = (i) => {
    //     console.log('i of isActive', i);
    //     setIndex(i);
    // }

    return (
        <CustomHeader id="header">
            {
                links.map(link => (
                    <Link
                        key={ link.id }
                        to={ link.url }
                        activeClassName="active"
                    >
                        { link.text }
                    </Link>
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
        transition: background-color .3s ease-out;
      
        // &:last-child {
        //     background-color: ${props => props.theme.purple};
        // }
      
        &:not(:last-child) {
            border-right: none;
        }
      
        &:hover {
            background-color: ${props => props.theme.purple};
        }
        
        &.active {
            transition: background-color .3s ease-out;
            background-color: ${props => props.theme.purple};
        }
    }
`

export default Header;