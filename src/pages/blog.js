import React from 'react';
import {Link, graphql} from "gatsby";
import {Helmet} from "react-helmet";

const Design = ({data}) => {
    return (
        <main>
            <h1>
                Test Gatsby Blog
                <span>Blog Test</span>
            </h1>

            <h2>
                Blog Posts
            </h2>

            {Index({data})}
        </main>
    );
};

export function Index({ data }) {
    const { edges: posts } = data.allMarkdownRemark;

    return (
        <div className="posts">
            {
                posts
                    .filter(post => post.node.frontmatter.title.length > 0)
                    .map(({ node: post }) => {
                        return (
                            <div className="blog-post-preview" key={post.id}>
                                <h1>
                                    <Link to={post.frontmatter.path}>{post.frontmatter.title}</Link>
                                </h1>
                                <h2>{post.frontmatter.date}</h2>
                                <p>{post.excerpt}</p>
                            </div>
                        )
                    })
            }
        </div>
    )
}

export const pageQuery = graphql(`
    query indexQuery {
        allMarkdownRemark: (sort: { order: DESC, fields: [frontmatter___date] }) {
            edges {
                node {
                    excerpt(pruneLength: 250)
                    id
                    frontmatter {
                        title
                        date(formatString: "MMMM DD, YYYY")
                        path                    
                    }
                }
            }
        }
    }
`)

export default Design;

export const Head = () => <title>Blog Home</title>