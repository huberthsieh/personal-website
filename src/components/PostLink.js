import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const PostLink = ({ post }) => {
    const featuredImg = getImage(post.frontmatter.featuredImage?.childImageSharp?.gatsbyImageData);

    return (
        <Post>
            <PostInner>
                <PostImage>
                    <GatsbyImage image={featuredImg} alt="image"/>
                </PostImage>

                <PostCategory>
                    {post.frontmatter.category}
                </PostCategory>

                <PostTitle to={post.frontmatter.slug}>
                    {post.frontmatter.title}
                </PostTitle>

                <PostDate>
                    {post.frontmatter.date}
                </PostDate>

                <PostDate>
                    by {post.frontmatter.author}
                </PostDate>

                <PostMore to={post.frontmatter.slug}>
                    閱讀更多
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
    border: solid 2px ${props => props.theme.gray};
    //border-top: solid 8px ${props => props.theme.black};
    //padding: 0 12px 12px;
    position: relative;
`;

const PostTitle = styled(Link)`
    color: ${props => props.theme.gray};
    display: block;
    font-size: 24px;
    font-weight: 700;
    padding: 0 20px;
`;

const PostDate = styled.div`
    padding-left: 20px;
`;

const PostCategory = styled.div`
    padding-left: 20px;
`;

const PostMore = styled(Link)`
    font-size: 18px;
    font-weight: 700;
    color: ${props => props.theme.gray};
    display: block;
    margin-top: 15px;
    border-top: solid 1px ${props => props.theme.gray};
    padding: 10px 0 10px 20px;
`;

const PostImage = styled.div`
    border: solid 2px red;
`;

export default PostLink;

