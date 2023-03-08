import * as React from "react";
import { graphql } from "gatsby";
import styled from 'styled-components';
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Layout from "../components/Layout";

export default function BlogPostTemplate({ data }) {
    const { markdownRemark } = data; // data.markdownRemark holds your post data
    const { frontmatter, html } = markdownRemark;

    const post = markdownRemark
    const featuredImg = getImage(post.frontmatter.featuredImage?.childImageSharp?.gatsbyImageData)

    console.log('frontmatter ===>', frontmatter);
    console.log('featuredImg ===>', featuredImg);

    return (
        <Layout>
            <BlogPostContainer className="blog-post-container">
                <div className="blog-post">
                    <h1>{frontmatter.title}</h1>
                    <h2>{frontmatter.date}</h2>
                    <h2>{frontmatter.category}</h2>
                    <h2>{frontmatter.author}</h2>
                    <div
                        className="blog-post-content"
                        dangerouslySetInnerHTML={{ __html: html }}
                    />
                </div>
            </BlogPostContainer>
        </Layout>
    )
}

const BlogPostContainer = styled.div`
    border: solid 2px blue;
    min-height: 100vh;
    padding: 40px;
`;

// 模板欄位對應md files
export const pageQuery = graphql`
    query($slug: String!) {
        markdownRemark(frontmatter: { slug: { eq: $slug } }) {
            html
            frontmatter {
                slug
                date(formatString: "MMMM DD, YYYY")
                title
                category
                author
            }
        }  
    }
`
