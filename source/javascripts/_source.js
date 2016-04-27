const tetherCSS = require('!style!css!tether/dist/css/tether.min.css');
const bootstrapCSS = require("!style!css!sass!../../components/bootstrap/bootstrap.scss");
const productCardCSS = require("!style!css!sass!../../components/product-card/index.scss");

const React = require('react');
const ReactDOM = require('react-dom');

var $ = window.jQuery = require('jquery/dist/jquery.min.js');
window.Tether = require('tether/dist/js/tether.min.js');
const bootstrap = require('bootstrap/dist/js/bootstrap.min.js');

const ProductCard = require('../../components/product-card');

$(function(){

  var productCard1 = (
    <ProductCard
      type="info"
      title="Asus Zenfone Max ZC550KL (Black, 16GB)"
      brand="Asus"
      offers={20}
      price="$300 - $375"
      image="http://img6a.flixcart.com/image/mobile/g/2/z/asus-zenfone-2-laser-ze600kl-400x400-imae9tftbfdcxzng.jpeg"
      stores={2}
      onClick={function(){}}
    />
  );

  var productCard2 = <ProductCard
                      type="buy-button"
                      title="Red Tape Lace Up Shoes"
                      price="$250"
                      image="http://img5a.flixcart.com/image/shoe/f/y/x/tan-rtr0543-red-tape-8-400x400-imaegyb7gfkzfhca.jpeg"
                      link="http://www.flipkart.com/red-tape-lace-up-shoes/p/itmef45cysyuapwz?pid=SHOEF45CCBYMKTYZ&al=eLMVebIYBeF74M9uXt4OuMldugMWZuE7eGHgUTGjVrpki%2FHwOpPzoSA8rS4zyg0gV8llYf0w6tw%3D&ref=L%3A-4732594686548295081&srno=b_4"
                    />;

  var productCard3 = <ProductCard
                      type="buy-button"
                      title="Nikon COOLPIX L830 16 MP CMOS Digital Camera with 34x Zoom NIKKOR Lens and Full 1080p HD Video (Black) (Certified Refurbished)"
                      price="$159.95"
                      image="http://ecx.images-amazon.com/images/I/71T1GR8Wn-L._SL1000_.jpg"
                      link="http://www.amazon.com/dp/B00P17XY0A?psc=1"
                    />;

  var productCard4 = <ProductCard
                      type="buy-button"
                      title="Asus Zenfone Max ZC550KL (Black, 16GB)"
                      price="$300"
                      image="http://img6a.flixcart.com/image/mobile/g/2/z/asus-zenfone-2-laser-ze600kl-400x400-imae9tftbfdcxzng.jpeg"
                      link="http://www.flipkart.com/asus-zenfone-2-laser-ze550kl/p/itme9j58yzyzqzgc?pid=MOBE9J587QGMXBB7&cmpid=content_mobile_8965229628_gmc_pla&tgi=sem%2C1%2CG%2C11214002%2Cg%2Csearch%2C%2C50314734860%2C1o1%2C%2C%2Cc%2C%2C%2C%2C%2C%2C%2C&gclid=COXOvIX-xssCFUYXaAodf1kC1A"
                    />;

  var productCard5 = <ProductCard
                      type="buy-button"
                      title="Red Tape Lace Up Shoes"
                      price="$250"
                      image="http://img5a.flixcart.com/image/shoe/f/y/x/tan-rtr0543-red-tape-8-400x400-imaegyb7gfkzfhca.jpeg"
                      link="http://www.flipkart.com/red-tape-lace-up-shoes/p/itmef45cysyuapwz?pid=SHOEF45CCBYMKTYZ&al=eLMVebIYBeF74M9uXt4OuMldugMWZuE7eGHgUTGjVrpki%2FHwOpPzoSA8rS4zyg0gV8llYf0w6tw%3D&ref=L%3A-4732594686548295081&srno=b_4"
                    />;

  var productCard6 = <ProductCard
                      type="buy-button"
                      title="Nikon COOLPIX L830 16 MP CMOS Digital Camera with 34x Zoom NIKKOR Lens and Full 1080p HD Video (Black) (Certified Refurbished)"
                      price="$159.95"
                      image="http://ecx.images-amazon.com/images/I/71T1GR8Wn-L._SL1000_.jpg"
                      link="http://www.amazon.com/dp/B00P17XY0A?psc=1"
                    />;

  var productCard7 = <ProductCard
                      type="buy-button"
                      title="GoPro HERO4 Silver"
                      price="$300"
                      image="http://ecx.images-amazon.com/images/I/71649Vf%2B2dL._SL1500_.jpg"
                      link="http://www.amazon.com/GoPro-CHDHY-401-HERO4-Silver/dp/B00NIYJF6U/ref=zg_bs_502394_4"
                    />;

  ReactDOM.render(productCard1, $('#product-card-example-1')[0]);
  ReactDOM.render(productCard2, $('#product-card-example-2')[0]);
  ReactDOM.render(productCard3, $('#product-card-example-3')[0]);

  ReactDOM.render(productCard4, $('#product-card-example-4')[0]);
  ReactDOM.render(productCard5, $('#product-card-example-5')[0]);
  ReactDOM.render(productCard6, $('#product-card-example-6')[0]);
  ReactDOM.render(productCard7, $('#product-card-example-7')[0]);

});
