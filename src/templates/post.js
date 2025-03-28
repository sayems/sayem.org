import React from 'react'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../layout'
import UserInfo from '../components/UserInfo'
import PostTags from '../components/PostTags'
import SEO from '../components/SEO'
import config from '../../data/SiteConfig'
import { editOnGithub, formatDate } from '../utils/global'

const PostTemplate = ({ pageContext, data }) => {
    const { slug } = pageContext;
    const postNode = data.markdownRemark;
    const post = postNode.frontmatter;
    let thumbnail;

    if (!post.id) {
        post.id = slug;
    }

    if (!post.category_id) {
        post.category_id = config.postDefaultCategoryID;
    }

    if (post.thumbnail) {
        thumbnail = post.thumbnail.childImageSharp.fixed;
    }

    const date = formatDate(post.date);
    const githubLink = editOnGithub(post);
    const twitterUrl = `https://twitter.com/search?q=${config.siteUrl}/${post.slug}/`;
    const twitterShare = `http://twitter.com/share?text=${encodeURIComponent(post.title)}&url=${
        config.siteUrl
    }/${post.slug}/&via=sayems`;

    return (
        <Layout>
            <Helmet>
                <title>{`${post.title} – ${config.siteTitle}`}</title>
            </Helmet>
            <SEO postPath={slug} postNode={postNode} postSEO/>
            <article className="single container">
                <header className={`single-header ${!thumbnail ? 'no-thumbnail' : ''}`}>
                    {thumbnail ? <Img fixed={post.thumbnail.childImageSharp.fixed}/> : null}
                    <div className="flex">
                        <h1>{post.title}</h1>
                        <div className="post-meta">
                            <time className="date">{date}</time>
                            /
                            <a className="twitter-link" href={twitterShare}>
                                Share
                            </a>
                            /
                            <a className="github-link" href={githubLink} target="_blank" rel="noopener noreferrer">
                                Edit on Github ✏️
                            </a>
                        </div>
                        <PostTags tags={post.tags}/>
                    </div>
                </header>
                <div className="post" dangerouslySetInnerHTML={{__html: postNode.html}}/>
                <div>
                    <a className="button twitter-button" href={twitterShare} target="_blank" rel="noopener noreferrer">
                        Share
                    </a>{' '}
                    <a className="button twitter-button" href={twitterUrl} target="_blank" rel="noopener noreferrer">
                        Discuss
                    </a>
                </div>
            </article>
            <UserInfo config={config}/>
        </Layout>
    );
};

export default PostTemplate;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      excerpt
      frontmatter {
        title
        thumbnail {
          childImageSharp {
            fixed(width: 150, height: 150) {
              ...GatsbyImageSharpFixed
            }
          }
        }
        slug
        date
        categories
        tags
        template
      }
      fields {
        slug
        date
      }
    }
  }
`;
