// Abbreviated example
var stylelint = require('stylelint');

var ruleName = 'stylelint/regex';
var messages = stylelint.utils.ruleMessages(ruleName, {
  expected: 'Expected ...'
});

module.exports = stylelint.createPlugin(ruleName, function(
  primaryOption,
  secondaryOptionObject
) {
  return function(postcssRoot, postcssResult) {
    var validOptions = stylelint.utils.validateOptions(
      postcssResult,
      ruleName,
      primaryOption
    );

    if (!validOptions) {
      return;
    }

    const fileName = postcssRoot.source.input.file;
    const css = postcssRoot.source.input.css;
    let m;

    if (secondaryOptionObject.ignore.some(f => fileName.indexOf(f) > -1)) {
      return;
    }

    for (regex in primaryOption) {
      const message = primaryOption[regex];
      m = new RegExp(regex, 'gm').exec(css);
      if (m) {
        stylelint.utils.report({
          message: message + ' has been violated in ' + fileName,
          ruleName: ruleName,
          result: postcssResult,
          node: postcssRoot
        });
      }
    }
  };
});

module.exports.ruleName = ruleName;
module.exports.messages = messages;
