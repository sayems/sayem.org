import React, {Component} from 'react'
import Helmet from 'react-helmet'
import {graphql} from 'gatsby'
import GitHubButton from 'react-github-btn'
import Layout from '../layout'
import PostListing from '../components/PostListing'
import ProjectListing from '../components/ProjectListing'
import SEO from '../components/SEO'
import config from '../../data/SiteConfig'
import projects from '../../data/projects'

export default class Index extends Component {
    render() {
        const {data} = this.props;

        const latestPostEdges = data.latest.edges;
        const popularPostEdges = data.popular.edges;

        return (
            <Layout>
                <Helmet title={`${config.siteTitle} – Software Engineer`}/>
                <SEO/>
                <div className="container">
                    <div className="lead">
                        <div>
                            <h1>{`Hi, I'm Syed`}</h1>
                            <p>
                                {`I'm a software engineer specializing in automation and devops. `}
                            </p>
                            <div className="social-buttons">
                                <div>
                                    <a
                                        className="twitter-follow-button"
                                        href="https://twitter.com/sayems"
                                        data-size="large"
                                        data-show-screen-name="false"
                                    >
                                        Follow @sayems
                                    </a>
                                </div>
                                <div>
                                    <GitHubButton
                                        href="https://github.com/sayems"
                                        data-size="large"
                                        data-show-count="true"
                                        aria-label="Follow @sayems on GitHub"
                                    >
                                        Follow
                                    </GitHubButton>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="container front-page">
                    <section className="section">
                        <h2>Latest Articles</h2>
                        <PostListing simple postEdges={latestPostEdges}/>
                    </section>

                    <section className="section">
                        <h2>Most Popular</h2>
                        <PostListing simple postEdges={popularPostEdges}/>
                    </section>

                    <section className="section">
                        <h2>Open Source Projects</h2>
                        <ProjectListing projects={projects}/>
                    </section>

                </div>
            </Layout>
        )
    }
}

export const pageQuery = graphql`
  query IndexQuery {
    latest: allMarkdownRemark(
      limit: 6
      sort: { fields: [fields___date], order: DESC }
      filter: { frontmatter: { template: { eq: "post" } } }
    ) {
      edges {
        node {
          fields {
            slug
            date
          }
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            categories
            thumbnail {
              childImageSharp {
                fixed(width: 150, height: 150) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
            date
            template
          }
        }
      }
    }
    popular: allMarkdownRemark(
      limit: 7
      sort: { fields: [fields___date], order: DESC }
      filter: { frontmatter: { categories: { eq: "Popular" } } }
    ) {
      edges {
        node {
          fields {
            slug
            date
          }
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            categories
            thumbnail {
              childImageSharp {
                fixed(width: 150, height: 150) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
            date
            template
          }
        }
      }
    }
  }
`;
