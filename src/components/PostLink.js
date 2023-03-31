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

                <PostContent>
                    <PostCategory>
                        {post.frontmatter.category}
                    </PostCategory>

                    <PostTitle to={post.frontmatter.slug}>
                        {post.frontmatter.title}
                    </PostTitle>

                    <PostDate>
                        {post.frontmatter.date}
                    </PostDate>

                </PostContent>

                <PostMore to={post.frontmatter.slug}>
                    閱讀更多
                </PostMore>

            </PostInner>
        </Post>
    )
}

const Post = styled.div`
    // border: solid 1px ${props => props.theme.black};
    width: calc(100% / 3);
    padding: 10px;

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
    padding-bottom: 48px;
`;

const PostContent = styled.div`
`;

const PostTitle = styled(Link)`
    color: ${props => props.theme.gray};
    display: block;
    font-size: 24px;
    font-weight: 700;
    padding: 5px 20px;
`;

const PostDate = styled.div`
    padding-left: 20px;
    padding-bottom: 5px;
`;

const PostCategory = styled.div`
    padding: 10px 20px;
    background-color: ${props => props.theme.gray}; 
    color: ${props => props.theme.white};
    letter-spacing: 1.2px;
    font-weight: 700;
`;

const PostMore = styled(Link)`
    font-size: 18px;
    font-weight: 700;
    color: ${props => props.theme.gray};
    display: block;
    margin-top: 15px;
    border-top: solid 1px ${props => props.theme.gray};
    padding: 10px 0 10px 20px;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
`;

const PostImage = styled.div`
    & > div {
        width: 100%;
        aspect-ratio: 2 / 1;
    }
`;

export default PostLink;

