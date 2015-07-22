'use strict';

define(function (require, exports, module) {
    var $ = require('$');
    require('react');
    var Dialog = require('Dialog');

    var Page2 = React.createClass({
        title: 'page2',
        $elem: $('#pageWrapper'),
        render: function (){
            React.render(
		    	<Dialog text='对话框，碉堡了!' buttons={['确定']}></Dialog>,
		    	this.$elem[0]
		    );
        }
    });
        
    module.exports = Page2;
});