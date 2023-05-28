require("prismjs/themes/prism.css");

exports.onClientEntry = () => {
    require("prismjs/plugins/line-numbers/prism-line-numbers.css");
}