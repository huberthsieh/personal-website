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
                        author
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
    padding: 20px;
`;

const PostsInf = styled.div`
    width: 25%; 
    font-size: 32px;
    padding: 20px;
    text-transform: uppercase;
`;

const PostsInfInner = styled.div`
    //border: solid 2px red;
    width: 100%;
    height: 100%;
    background-color: ${props => props.theme.gray};
    color: #F3F3F3;
    padding: 24px;
`;