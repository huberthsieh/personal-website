exports.createPages = ({ actions, graphql }) => {
    console.log('actions', actions);

    const {createPage} = actions;

    const blogPostTemplate = require.resolve(`./src/templates/blogTemplate.js`);

    return graphql(`
    {
        allMarkdownRemark(sort: { frontmatter: { date: DESC } }, limit: 1000) {
            edges {
                node {
                    frontmatter {
                        slug
                    }
                }
            }
        }
    }`).then(result => {
        console.log('result ===> ', result);
        if (result.errors) {
            console.log('result.errors ===> ', result.errors);
            return Promise.reject(result.errors)
        }

        return result.data.allMarkdownRemark.edges.forEach(({node}) => {
            createPage({
                path: node.frontmatter.slug,
                component: blogPostTemplate,
                context: {
                    // additional data can be passed via context
                    slug: node.frontmatter.slug
                },
            })
        })
    })
}

exports.createSchemaCustomization = ({ actions }) => {
    const { createTypes } = actions
    const typeDefs = `
    type AuthorJson implements Node {
      joinedAt: Date
    }
  `
    createTypes(typeDefs)
}