import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'gatsby';
import {devices} from "../config/device";

const links = [
    {
        id: 1,
        url: '/',
        text: 'HOME'
    },
    {
        id: 2,
        url: '/blog',
        text: 'Blog'
    }
]

const Header = () => {
    return (
        <CustomHeader id="header">
            <HeaderInf>HUBERT</HeaderInf>
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
        border: solid 2px ${props => props.theme.gray};
        width: calc(100% / 3);
        text-align: center;
        text-transform: uppercase;
        padding: 12px 24px;
        font-size: 18px;
        font-weight: 700;
        color: ${props => props.theme.gray};
        text-decoration: none;
        transition: background-color .3s ease-out;
      
        &:not(:last-child) {
            border-right: none;
        }
      
        &:hover {
            background-color: ${props => props.theme.green};
        }
        
        &.active {
            transition: background-color .3s ease-out;
            background-color: ${props => props.theme.green};
        }
    }
`

const HeaderInf = styled.div`
    border: solid 2px ${props => props.theme.gray};
    border-right: none;
    background-color: ${props => props.theme.gray};
    color: ${props => props.theme.white};
    width: calc(100% / 3);
    padding: 12px 24px;
    font-size: 18px;
    font-weight: 700;
    text-align: center;

    @media ${devices.mobile} {
        width: 50%;
    }
`

export default Header;