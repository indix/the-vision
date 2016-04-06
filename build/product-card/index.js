"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');

var ProductCard = function (_React$Component) {
  _inherits(ProductCard, _React$Component);

  function ProductCard(props) {
    _classCallCheck(this, ProductCard);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ProductCard).call(this, props));
  }

  _createClass(ProductCard, [{
    key: "render",
    value: function render() {

      return React.createElement(
        "div",
        { className: "card card-block product-card" },
        React.createElement(
          "div",
          { className: "image" },
          React.createElement("img", { src: this.props.image, alt: this.props.image, className: "img-rounded" })
        ),
        React.createElement(
          "div",
          { className: "info" },
          React.createElement(
            "div",
            { className: "title-wrap" },
            React.createElement(
              "h6",
              { className: "title" },
              this.props.title
            )
          ),
          React.createElement(
            "h6",
            { className: "price" },
            this.props.price
          )
        ),
        React.createElement(
          "a",
          { href: this.props.link, className: "btn btn-primary", target: "_blank" },
          "Buy Now"
        )
      );
    }
  }]);

  return ProductCard;
}(React.Component);

module.exports = ProductCard;