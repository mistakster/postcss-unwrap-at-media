var postcss = require('postcss');

function normalizeArray(arr) {
	return Array.isArray(arr) ? arr : [arr];
}

function isAllowed(list, atRule) {
	return !(list && list.some(function (value) {
		return typeof value === 'function' ? value(atRule) : value === atRule.params;
	}));
}

module.exports = postcss.plugin('postcss-unwrap-at-media"', function (opts) {
	opts = opts || {};
	if (opts.disallow) {
		opts.disallow = normalizeArray(opts.disallow);
	}
	return function (css) {
		css.walkAtRules('media', function (atRule) {
			var i, len, node;
			if (isAllowed(opts.disallow, atRule) && atRule.nodes && atRule.nodes.length) {
				len = atRule.nodes.length - 1;
				for (i = len; i >= 0; i--) {
					node = atRule.nodes[i];
					if (i === len) {
						node.raws.after = (node.raws.after || '') + (atRule.raws.after || '');
					}
					if (i === 0) {
						node.raws.before = (atRule.raws.before || '') + (node.raws.before || '');
					}
					atRule.parent.insertAfter(atRule, node);
				}
			}
			atRule.remove();
		});
	};
});
