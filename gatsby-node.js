const path = require("path")

exports.createPages = async ({actions, graphql, reporter}) => {
    const {createPage} = actions

    const result = await graphql(`
        {
            allMarkdownRemark(
                sort: { order: DESC, fields: [frontmatter___date] }
                limit: 1000
            ) {
                edges {
                    node {
                        frontmatter {
                            path
                        }
                    }
                }
            }
        }
    `)

    if (result.errors) {
        reporter.panicOnBuild(`Error while running GraphQL query.`)
        return
    }

    const blogPostTemplate = path.resolve(`src/templates/blog.js`)

    // 創建所有Markdown
    result.data.allMarkdownRemark.edges.forEach(({node}) => {
        const path = node.frontmatter.path
        createPage({
            path,
            component: blogPostTemplate,
            context: {
                pagePath: path,
            },
        })
    })
}