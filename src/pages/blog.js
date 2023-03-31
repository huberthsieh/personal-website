import React from "react";
import styled from "styled-components";
import {graphql} from "gatsby";
import PostLink from "../components/PostLink";
import Layout from "../components/Layout";

const BlogPage = ({
    data: {
        allMarkdownRemark: { edges }
    }
}) => {
    const Posts = edges
        .filter(edge => !!edge.node.frontmatter.date) // You can filter your posts based on some criteria
        .map(edge => <PostLink key={edge.node.id} post={edge.node} />)

    console.log('edges', edges);

    return (
        <Layout>
            <PostsContainer>
                <PostsList>
                    <PostsInf>
                        <PostsInfInner>
                            Front End Developer
                            Hubert Hsieh
                        </PostsInfInner>
                    </PostsInf>
                    {Posts}
                </PostsList>
            </PostsContainer>
        </Layout>
    )
}

export default BlogPage;

export const pageQuery = graphql`
    query {
        allMarkdownRemark(sort: { frontmatter: { date: DESC }}) {
            edges {
                node {
                    id
                    excerpt(pruneLength: 250)
                    frontmatter {
                        date(formatString: "MMMM DD, YYYY")
                        slug
                        title
                        category
                        featuredImage {
                            childImageSharp {
                                gatsbyImageData(width: 800)
                            }
                        }
                    }
                }
            }
        }
    }
`;

const PostsContainer = styled.section`
    overflow: hidden;
    width: 100%;
    display: flex;
`;

const PostsList = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    padding: 10px;
`;

const PostsInf = styled.div`
    width: calc(100% / 3); 
    font-size: 40px;
    padding: 10px;
    text-transform: uppercase;
`;

const PostsInfInner = styled.div`
    width: 100%;
    height: 100%;
    background-color: ${props => props.theme.gray};
    color: ${props => props.theme.white};
    padding: 24px;
`;