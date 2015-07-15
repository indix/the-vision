/**
 * @jsx React.DOM
 */
'use strict';
var React = require('react');
var classnames = require('classnames');
var {Format} = require('../utilities');

var CategoryList = React.createClass({
  getInitialState(){
    return { expand: false};
  },
  _onSelect(event){
    var liEl = event.target.nodeName !== 'LI' ? event.target.parentNode : event.target;
    var data = {
      id: liEl.getAttribute('value'),
      name: liEl.innerText
    };
    if(typeof(this.props.onSelect) === 'function')
      this.props.onSelect(data);
  },
  handleExpand(event){
    if(this.state.expand){
      document.querySelector(".ix-category-list .categories").scrollTop = 0;
      this.setState({ expand: false});
    }else{
      this.setState({ expand: true});
    }
  },
  render: function() {
    var that = this;
    var categories = this.props.categories || {};
    var parent = categories.parent || {};
    var list = categories.children && categories.children.slice() || [];
    list.some((item, i) => item.id === parent.id && list.splice(i, 1)) // removing the current from children
    if(parent.id) // Current
      list.unshift({id: parent.id, name: parent.name, type: 'current'});
    else
      list.unshift({id: -1, name: 'All Categories', type: 'current'});
    if(parent.parent) // Parent
      list.unshift({
        type: 'parent',
        id: parent.parent,
        name: parent.parent_path.split('>').slice(-2,-1)[0] || 'All Categories'
      });
    return (
     <div className="ix-category-list">
       <div className="heading">categories</div>
       <ul className={classnames("categories",{expand:this.state.expand})}>
         {
          list.map(function(data, i){
            return (
              <li className={classnames('category-name', data.type || 'child')} value={data.id} key={i} onClick={that._onSelect}>
                <div>{data.name}</div>
                <span className="category-products-count">{data.count && Format.formatCount(data.count)}</span>
              </li>
            );
          })
         }
       </ul>
       {list.length > 5 &&
         <div className="expand-button">
            <span onClick={this.handleExpand}>{this.state.expand ? 'less' : 'more'}</span>
         </div>
       }
     </div>
    );
  }

});

module.exports = CategoryList;
