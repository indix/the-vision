'use strict';

var assign = require('react/lib/Object.assign');

var pbcs = {
  p: {
    text: 'product',
    className: 'product',
    idText: 'productId',
    plural: 'products'
  },
  b: {
    text: 'brand',
    className: 'brand',
    idText: 'brandId',
    plural: 'brands'
  },
  c: {
    text: 'category',
    className: 'category',
    idText: 'categoryId',
    plural: 'categories'
  },
  s: {
    text: 'store',
    className: 'store',
    idText: 'storeId',
    plural: 'stores'
  },
  converter: {
    letterToWord(){},
    pluralWordToLetter(obj){
      var newObj = assign({
        p: obj[pbcs.p.plural],
        b: obj[pbcs.b.plural],
        c: obj[pbcs.c.plural],
        s: obj[pbcs.s.plural]
      }, obj);
      delete newObj[pbcs.p.plural];
      delete newObj[pbcs.b.plural];
      delete newObj[pbcs.c.plural];
      delete newObj[pbcs.s.plural];
      return newObj;
    },
    wordToLetter(obj){
      var newObj = assign({
        p: obj[pbcs.p.text],
        b: obj[pbcs.b.text],
        c: obj[pbcs.c.text],
        s: obj[pbcs.s.text]
      }, obj);
      delete newObj[pbcs.p.text];
      delete newObj[pbcs.b.text];
      delete newObj[pbcs.c.text];
      delete newObj[pbcs.s.text];
      return newObj;
    },
    letterToId(obj){
      var newObj = assign({}, obj);
      newObj[pbcs.b.idText] = obj.b;
      newObj[pbcs.c.idText] = obj.c;
      newObj[pbcs.s.idText] = obj.s;
      delete newObj.b;
      delete newObj.c;
      delete newObj.s;
      return newObj;
    },
  }
};

module.exports = pbcs;
