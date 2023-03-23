import * as React from "react";
import { graphql } from "gatsby";
import styled from 'styled-components';
import Layout from "../components/Layout";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

export default function BlogPostTemplate({ data }) {
    const { markdownRemark } = data; // data.markdownRemark holds your post data
    const { frontmatter, html } = markdownRemark;

    const featuredImg = getImage(frontmatter.featuredImage?.childImageSharp?.gatsbyImageData);

    return (
        <Layout>
            <BlogPostContainer className="blog-post-container">
                <div className="blog-post">
                    <h1>{frontmatter.title}</h1>
                    <h2>{frontmatter.date}</h2>
                    <h2>{frontmatter.category}</h2>
                    <h2>{frontmatter.author}</h2>
                    <GatsbyImage image={featuredImg} alt="image"/>
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
                featuredImage {
                    childImageSharp {
                        gatsbyImageData(width: 800)
                    }
                }
            }
        }  
    }
`
