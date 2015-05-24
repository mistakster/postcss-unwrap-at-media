var postcss = require('postcss');

module.exports = postcss.plugin('postcss-unwrap-at-media"', function (opts) {
	return function (css) {
		css.eachAtRule('media', function (atRule) {
			var i, len, node;
			if (atRule.nodes && atRule.nodes.length) {
				len = atRule.nodes.length - 1;
				for (i = len; i >= 0; i--) {
					node = atRule.nodes[i];
					if (i === len) {
						node.after = (node.after || '') + (atRule.after || '');
					}
					if (i === 0) {
						node.before = (atRule.before || '') + (node.before || '');
					}
					atRule.parent.insertAfter(atRule, node);
				}
			}
			atRule.removeSelf();
		});
	};
});
