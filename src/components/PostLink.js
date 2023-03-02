import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";

const PostLink = ({ post }) => {
    console.log('post list', post)

    return (
        <Post>
            <PostInner>
                <PostImage />

                <PostTitle to={post.frontmatter.slug}>
                    {post.frontmatter.title}
                </PostTitle>
                <PostDate>
                    {post.frontmatter.date}
                </PostDate>
                <PostCategory>
                    {post.frontmatter.category}
                </PostCategory>

                <PostMore>
                    Read More
                </PostMore>

            </PostInner>
        </Post>
    )
}

const Post = styled.div`
    //border: solid 1px ${props => props.theme.black};
    width: 25%;
    padding: 20px;

    @media(max-width: ${props => props.theme.mobile}){
        width: 50%;
    }
`;

const PostInner = styled.div`
    height: 100%;
    width: 100%;
    //border: solid 2px blue;
    //border-top: solid 8px ${props => props.theme.black};
    //padding: 0 12px 12px;
    position: relative;
`;

const PostTitle = styled(Link)`
    color: ${props => props.theme.gray};
    font-size: 20px;
    font-weight: 700;
`;

const PostDate = styled.div``;

const PostCategory = styled.div`
`;

const PostMore = styled(Link)`
    font-size: 18px;
    font-weight: 700;
    color: ${props => props.theme.gray};
    display: block;
    padding-top: 5px; 
    margin-top: 15px;
    border-top: solid 1px ${props => props.theme.gray};
`;

const PostImage = styled.div`
    //border: solid 2px red;
    display: block;
    background-image: url("https://titangene.github.io/images/cover/javascript.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    width: 100%;
    height: 0;
    padding-bottom: 56.25%;
    margin-bottom: 10px;
`;

export default PostLink;

