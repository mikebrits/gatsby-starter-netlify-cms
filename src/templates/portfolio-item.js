import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import Content, { HTMLContent } from '../components/Content'
import _ from 'lodash';

export const PortfolioItemTemplate = ({
  title,
  description,
  html,
  images,
  tags,
  contentComponent,
  helmet,
  content
}) => {
  const PostContent = contentComponent || Content
  console.log("images", images);
  return (
    <section className="section">
      {helmet || ''}
      
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            <p>{description}</p>
            {_.map(images, (image, index) => {
                return (
                <div key={index}>
                  <img src={image.image} />
                  {image.caption}
                </div> 
                )
            })
            }
            <PostContent content={content} />
            {tags && tags.length ? (
              <div style={{ marginTop: `4rem` }}>
                <h4>Tags</h4>
                <ul className="taglist">
                  {tags.map(tag => (
                    <li key={tag + `tag`}>
                      <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

PortfolioItemTemplate.propTypes = {
  content: PropTypes.string.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  //helmet: PropTypes.instanceOf(Helmet),
  images : PropTypes.arrayOf(PropTypes.shape({
    image: PropTypes.string,
    caption: PropTypes.string
  }))
}

const PortfolioItem = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <PortfolioItemTemplate
      content={post.html}
      contentComponent={HTMLContent}
      description={post.frontmatter.description}
      helmet={<Helmet title={`${post.frontmatter.title} | Portfolio`} />}
      tags={post.frontmatter.tags}
      title={post.frontmatter.title}
      id={post.id}
      images={post.frontmatter.images}
    />
  )
}

PortfolioItem.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default PortfolioItem;

export const pageQuery = graphql`
  query PortfolioItemById($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        description
        images {
          image
          caption
        }
      }  
    }
  }
`
