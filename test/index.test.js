var fs = require('fs');
var postcss = require('postcss');

var plugin = require('../index');

describe('unwrap @media', function () {

	it('should remove all @media rules', function () {
		var result = postcss([plugin])
			.process(
				'@media (min-width: 720px) {\n    div {\n        color: red;\n    }\n}'
			);
		expect(result.css).toMatchSnapshot();
	});

	it('shouldn\'t touch other rules', function () {
		var result = postcss([plugin])
			.process(
				'p {\n    margin: 1em 0;\n}\n\n@media (min-width: 720px) {\n    div {\n        color: red;\n    }\n}'
			);
		expect(result.css).toMatchSnapshot();
	});

	it('should delete a block with particular @media rules', function () {
		var result = postcss([plugin({ disallow: 'print' })])
			.process(
				'@media print {\n    div {\n        color: red;\n    }\n}\n\n' +
				'@media screen {\n    div {\n        color: red;\n    }\n}\n\n' +
				'p {\n    margin: 1em 0;\n}'
			);
		expect(result.css).toMatchSnapshot();
	});

	it('should delete a block with any of specified @media rules', function () {
		var result = postcss([plugin({ disallow: ['print', 'screen'] })])
			.process(
				'@media print {\n    div {\n        color: red;\n    }\n}\n\n' +
				'@media screen {\n    div {\n        color: red;\n    }\n}\n\n' +
				'p {\n    margin: 1em 0;\n}'
			);
		expect(result.css).toMatchSnapshot();
	});

});
