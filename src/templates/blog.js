import React from "react";
import {Helmet} from "react-helmet";
import {graphql} from "gatsby";

export default function Template({ data }) {
    const { markdownRemark: post } = data
    return (
        <div className="blog-post-container">
            <Helmet title={`Hubert's Blog - ${post.frontmatter.title}`} />
            <div className="blog-post">
                <h1>{post.formatter.title}</h1>
                <div
                    className="blog-post-content"
                    dangerouslySetInnerHTML={{ __html: post.html }}
                />
            </div>
        </div>
    )
};

export const pageQuery = graphql(`
    query BlogPostByPath($path: String!) {
        markdownRemark(frontmatter: { path: { eq: $path } }) {
            html
            frontmatter {
                path
                date(formatString: "MMMM DD, YYYY")
                title
            }
        }
    }
`);