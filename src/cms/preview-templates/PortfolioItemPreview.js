import React from 'react'
import PropTypes from 'prop-types'
import { PortfolioItemTemplate } from '../../templates/portfolio-item'

const PortfolioItemPreview = ({ entry, widgetFor }) => (
  <PortfolioItemTemplate
    content={widgetFor('body')}
    description={entry.getIn(['data', 'description'])}
    tags={entry.getIn(['data', 'tags'])}
    title={entry.getIn(['data', 'title'])}
    //images={entry.getIn(['data', 'images'])}
  />
)

PortfolioItemPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default PortfolioItemPreview
