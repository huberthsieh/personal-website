module.exports = {
    siteMetadata: {
        title: `my-personal-website`,
        siteUrl: `https://hubert-website.vercel.app/`,
        image: `/gatsby-icon.png`
    },
    plugins: [
        `gatsby-plugin-sass`,
        "gatsby-plugin-styled-components",
        {
            resolve: 'gatsby-plugin-manifest',
            options: {
                "icon": "src/images/icon.png"
            }
        },
        `gatsby-transformer-remark`,
        "gatsby-plugin-sharp",
        "gatsby-transformer-sharp",
        `gatsby-plugin-image`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/src/content`,
            },
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                "name": `images`,
                "path": `${__dirname}/src/images`
            },
            __key: `images`
        },
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                            showCaptions: true,
                            maxWidth: 800,
                        },
                    },
                ],
            },
        },
        {
            resolve: `gatsby-omni-font-loader`,
            options: {
                enableListener: true,
                preconnect: [`https://fonts.googleapis.com`, `https://fonts.gstatic.com`],
                web: [
                    {
                        name: `Open Sans`,
                        file: `https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap`,
                    },
                    {
                        name: `Noto Sans TC`,
                        file: `https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500&display=swap`,
                    },
                ],
            },
        },
    ]
};