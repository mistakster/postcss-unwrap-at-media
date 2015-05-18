var should = require('should');
var fs = require('fs');
var postcss = require('postcss');

var plugin = require('../index');

describe('unwrap @media', function () {

	it('should remove all @media rules', function () {
		var css = postcss([plugin])
			.process('@media (min-width: 720px) {\n    div {\n        color: red;\n    }\n}')
			.css;
		css.should.be.equal('div {\n    color: red\n}');
	});

	it('shouldn\'t touch other rules', function () {
		var css = postcss([plugin])
			.process('p {\n    margin: 1em 0;\n}\n\n@media (min-width: 720px) {\n    div {\n        color: red;\n    }\n}')
			.css;
		css.should.be.equal('p {\n    margin: 1em 0;\n}\n\ndiv {\n    color: red;\n}');
	});

});