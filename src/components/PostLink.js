import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";

const PostLink = ({ post }) => {
    console.log('post list', post)

    return (
        <Post>
            <PostInner>
                <PostTitle to={post.frontmatter.slug}>
                    {post.frontmatter.title}
                </PostTitle>
                <PostDate>
                    {post.frontmatter.date}
                </PostDate>
                <PostCategory>
                    {post.frontmatter.category}
                </PostCategory>

                {/*<PostMore to={post.frontmatter.slug}>*/}
                {/*    More*/}
                {/*</PostMore>*/}
            </PostInner>
        </Post>
    )
}

const Post = styled.div`
    border: solid 1px ${props => props.theme.black};
    width: 25%;
    //width: calc(100% / 4 - 16px);
    //flex: 0 0 calc(100% / 4 - 16px);
    min-height: 300px;
    padding: 8px;
`;

const PostInner = styled.div`
    height: 100%;
    width: 100%;
    border: solid 2px blue;
    padding: 8px;
    position: relative;
`;

const PostTitle = styled(Link)`
    font-size: 20px;
    font-weight: 700;
`;

const PostDate = styled.div``;

const PostCategory = styled.div`
    border: solid 2px red;
`;

export default PostLink;

