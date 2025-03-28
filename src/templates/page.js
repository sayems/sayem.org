import React from 'react'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../layout'
import SEO from '../components/SEO'
import config from '../../data/SiteConfig'

const PageTemplate = ({ pageContext, data }) => {
    const { slug } = pageContext;
    const postNode = data.markdownRemark;
    const page = postNode.frontmatter;

    if (!page.id) {
        page.id = slug;
    }

    return (
        <Layout>
            <Helmet>
                <title>{`${page.title} – ${config.siteTitle}`}</title>
            </Helmet>
            <SEO postPath={slug} postNode={postNode} postSEO/>
            <div className="container">
                <article>
                    <header className="page-header">
                        <h1>{page.title}</h1>
                    </header>
                    <div className="page" dangerouslySetInnerHTML={{__html: postNode.html}}/>
                </article>
            </div>
        </Layout>
    );
};

export default PageTemplate;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query PageBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      excerpt
      frontmatter {
        title
        template
      }
      fields {
        slug
        date
      }
    }
  }
`;
