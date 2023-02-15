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
                        Front End Developer
                        Hubert Hsieh
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
                        test
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
    //background-color: ${props => props.theme.yellow}
`;

const PostsList = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
`;

const PostsInf = styled.div`
    width: 25%; 
    font-size: 32px;
    padding: 16px;
    text-transform: uppercase;
    color: ${props => props.theme.black};
    background-color: ${props => props.theme.green};
`;