const React = require('react')

class ProductCard extends React.Component{

  constructor(props) {
    super(props)
  }

  renderBuyButton(props) {
    return (
      <div className="card card-block product-card">
        <div className="image">
          <img src={props.image} alt={props.image} className="img-rounded" />
        </div>
        <div className="info">
          <div className="title-wrap">
            <h6 className="title">{props.title}</h6>
          </div>
          <h6 className="price">{props.price}</h6>
        </div>
        <a href={props.link} className="btn btn-primary" target="_blank">Buy Now</a>
      </div>
    )
  }

  render() {
    if(this.props.type === 'buy-button')
      return this.renderBuyButton(this.props)

    return (
      <div className="card card-block product-card" onClick={event => this.props.onClick(event, this.props)}>
        <div className="image">
          <img src={this.props.image} alt={this.props.image} className="img-rounded" />
        </div>
        <div className="info">
          <div className="title-wrap">
            <h6 className="title">{this.props.title}</h6>
          </div>
          {
            [
              this.props.brand &&
              <div className="brand" key="brand">by1 {this.props.brand}</div>
              ,
              !isNaN(this.props.offers) && this.props.offers >= 0 &&
              <div className="offers" key="offers"><span className="count">{this.props.offers} offer{this.props.offers <= 1 ? '' : 's'}</span></div>
              ,
              this.props.price &&
              <h6 className="price" key="price">from {this.props.price}</h6>
              ,
              !isNaN(this.props.stores) && this.props.stores >= 0 &&
              <div className="stores" key="stores">Available in {this.props.stores == 0 ? 'no' : this.props.stores} store{this.props.stores <= 1 ? '' : 's'}</div>
            ]
          }
        </div>
      </div>
    )
  }
}

ProductCard.propTypes = {
  type: React.PropTypes.oneOf(['buy-button', 'info']),
  image: React.PropTypes.string,
  title: React.PropTypes.string.isRequired,
  brand: React.PropTypes.string,
  offers: React.PropTypes.number,
  price: React.PropTypes.string,
  stores: React.PropTypes.number,
  onClick: React.PropTypes.func,
}

ProductCard.defaultProps = {
  type: 'buy-button',
  onClick: x => x,
}

module.exports = ProductCard
