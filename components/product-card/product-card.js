import React from 'react';

class ProductCard extends React.Component{

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className="card card-block product-card">
        <div className="image">
          <img src={this.props.image} alt={this.props.image} className="img-rounded" />
        </div>
        <div className="info">
          <div className="title-wrap">
            <h6 className="title">{this.props.title}</h6>
          </div>
          <h6 className="price">{this.props.price}</h6>
        </div>
        <a href={this.props.link} className="btn btn-primary" target="_blank">Buy Now</a>
      </div>
    )
  }
}

module.exports = ProductCard;
