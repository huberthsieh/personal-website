import * as React from "react";
import { graphql } from "gatsby";
import styled from 'styled-components';
import Layout from "../components/Layout";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { devices } from "../config/device";

export default function BlogPostTemplate({ data }) {
    const { markdownRemark } = data; // data.markdownRemark holds your post data
    const { frontmatter, html } = markdownRemark;

    const featuredImg = getImage(frontmatter.featuredImage?.childImageSharp?.gatsbyImageData);

    return (
        <Layout>
            <BlogPostContainer className="blog-post-container">
                <div className="blog-post">
                    <BlogTitle>
                        {frontmatter.title}
                        <BlogCategory>
                            {frontmatter.category}
                            <BlogDate>{frontmatter.date}</BlogDate>
                        </BlogCategory>
                    </BlogTitle>



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
    min-height: 100vh;
    padding: 40px;
  
    pre {
        background-color: ${props => props.theme.greenLight};
        border-radius: 4px;
        padding: 20px;
        overflow: hidden;
        overflow-x: auto;
      
        @media ${devices.mobile} {
            padding: 16px;
        }
      
        code {
            font-weight: 500;
            font-family: Noto Sans TC;
            font-size: 1.125rem;
        }
      
        &:has(.language-javascript) {
            //background-color: ${props => props.theme.purple};
        }
    }
  
    h3 {
        font-size: 1.5rem;
        font-weight: 700;
        margin: 30px 0 20px;
        padding-bottom: 15px;
        border-bottom: solid 2px ${props => props.theme.grayLight};
        color: ${props => props.theme.gray};
    }
  
    h4 {
        font-size: 1.2rem;
        font-weight: 500;
        margin: 20px 0;
    }

    ul, ol {
        list-style: inherit;
        margin: 20px 0;
        padding: 0 20px;
        font-size: 1.125rem;
    }
  
    ol {
        list-style: number;
    }
    
    p {
        margin: 20px 0;
        font-size: 1.125rem;
    }
  
    strong {
        font-weight: 500;
        color: ${props => props.theme.purpleDark};
    }

    blockquote {
        p {
            position: relative;
            padding-left: 20px;
            color: ${props => props.theme.green};
            font-size: 1.2rem;
            font-weight: 500;
            
            &:before {
                content: "";
                background-color: ${props => props.theme.green};
                width: 4px;
                height: 80%;
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-45%);
            }
        }
    }
  
    @media ${devices.mobile} {
        padding: 16px;
    }
`;

const BlogTitle = styled.h2`
    color: ${props => props.theme.gray}; 
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 20px;
  
    @media ${devices.mobile} {
        font-size: 26px;
    }
`;

const BlogCategory = styled.div`
    font-size: 1.5rem;
    color: ${props => props.theme.green};
`;

const BlogDate = styled.span`
    font-size: 1rem;
    padding-left: 1rem;
    color: ${props => props.theme.gray};
`

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
                featuredImage {
                    childImageSharp {
                        gatsbyImageData(width: 800)
                    }
                }
            }
        }  
    }
`
