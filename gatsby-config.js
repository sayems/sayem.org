require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

const postQuery = `{
  posts: allMdx(
    filter: { frontmatter: { published: { eq: true } } }
  ) {
    edges {
      node {
          frontmatter {
            title
            slug
            date(formatString: "MMMM Do, YYYY")
            datetimestamp
            tags
              image {
              sharp: childImageSharp {
                fixed(width: 75, height: 75) {
                  src
                  srcSetWebp
                  aspectRatio
                  base64
                }
              }
              extension
              publicURL
            }
          }
          timeToRead
          excerpt(pruneLength: 100000)
      }
    }
  }
}`

const queries = [
  {
    query: postQuery,
    transformer: ({ data }) => data.posts.edges.map(({ node }) => node), // optional
    settings: {},
  },
]

const dynamicPlugins = []
if (process.env.GA_SERVICE_ACCOUNT) {
  // // pick data from 3 months ago
  // const startDate = new Date()
  // startDate.setMonth(startDate.getMonth() - 12)
  dynamicPlugins.push({
    resolve: 'gatsby-plugin-guess-js',
    options: {
      GAViewID: process.env.GA_VIEW_ID,
      jwt: {
        client_email: process.env.GA_SERVICE_ACCOUNT,
        private_key: process.env.GA_SERVICE_ACCOUNT_KEY,
      },
      period: {
        startDate: new Date('2018-1-1'),
        endDate: new Date(),
      },
    },
  })
}

module.exports = {
  siteMetadata: {
    defaultTitle: "Sayem's Blog",
    title: "Sayem's Blog RSS Feed",
    titleTemplate: "%s • Sayem's Blog",
    defaultDescription:
      'Personal blog where you can find web development posts and tutorials. Updated weekly.',
    description:
      'Personal blog where you can find web development posts and tutorials. Updated weekly.',
    siteUrl: 'https://sayem.org',
    defaultImage: '/social.png',
    twitterUsername: '@sayems',
    facebookAppID: '',
  },
  plugins: [
    'gatsby-plugin-emotion',
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-dark-mode',
    'gatsby-plugin-force-trailing-slashes',
    {
      resolve: 'gatsby-mdx',
      options: {
        defaultLayouts: {
          default: require.resolve('./src/components/layout.js'),
        },
        gatsbyRemarkPlugins: [
          { resolve: 'gatsby-remark-images' },
          { resolve: 'gatsby-remark-prismjs' },
          { resolve: 'gatsby-remark-reading-time' },
          { resolve: 'gatsby-remark-smartypants' },
          { resolve: 'gatsby-remark-external-links' },
        ],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: './posts/',
      },
    },
    {
      resolve: 'gatsby-plugin-algolia',
      options: {
        appId: process.env.ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_API_KEY,
        indexName: process.env.ALGOLIA_INDEX_NAME,
        queries,
        chunkSize: 10000, // default: 1000
      },
    },
    {
      resolve: 'gatsby-plugin-prefetch-google-fonts',
      options: {
        fonts: [
          {
            family: 'IBM Plex Sans',
            variants: ['400', '600'],
          },
          {
            family: 'IBM Plex Mono',
            variants: ['400'],
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-preconnect',
      options: {
        domains: [
          'https://www.google.com',
          'https://marketingplatform.google.com',
          'https://www.google-analytics.com',
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: process.env.GA_TRACKING,
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: "Sayem's Blog",
        short_name: 'Blog',
        start_url: '/',
        background_color: '#121212',
        theme_color: '#f35627',
        display: 'standalone',
        icon: 'static/logo.svg',
      },
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-netlify',
    'gatsby-plugin-netlify-cache',
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://sayem.org/',
        sitemap: 'https://sayem.org/sitemap.xml',
        policy: [{ userAgent: '*', allow: '/' }],
      },
    },
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        feeds: [
          {
            serialize: ({ query: { site, allMdx } }) => allMdx.edges.map(edge => ({
              ...edge.node.frontmatter,
              description: edge.node.excerpt,
              url: `${site.siteMetadata.siteUrl}/${edge.node.frontmatter.slug}`,
              guid: `${site.siteMetadata.siteUrl}/${edge.node.frontmatter.slug}`,
              custom_elements: [{ 'content:encoded': edge.node.html }],
            })),
            query: `
                {
                  allMdx(
                    limit: 1000,
                    sort: {
                      order: DESC,
                      fields: [frontmatter___date]
                    }
                  ) {
                    edges {
                      node {
                        frontmatter {
                          title
                          date
                          slug
                        }
                        excerpt
                        html
                      }
                    }
                  }
                }
              `,
            output: 'rss.xml',
          },
        ],
      },
    },
    // 'gatsby-plugin-eslint',
    {
      resolve: 'gatsby-plugin-webpack-bundle-analyzer',
      options: {
        production: true,
        disable: !process.env.ANALYZE_BUNDLE_SIZE,
        generateStatsFile: true,
        analyzerMode: 'static',
      },
    },
  ],
}
