
var quill = new Quill('#questionsList', {
    modules: {
        toolbar: '#toolbar'
    }
});

let BlockEmbed = Quill.import('blots/block/embed');

class MathBlot extends BlockEmbed {
    static create() {
        let node = super.create();
        MathLive.makeMathField(node);
        return node;
    }
}
MathBlot.blotName = 'math';
MathBlot.tagName = 'span';

Quill.register(MathBlot);

var customButton = document.querySelector('#MathButton');
customButton.addEventListener('click', function () {
    let range = quill.getSelection(true);
    quill.insertText(range.index, '\n', Quill.sources.USER);
    quill.insertEmbed(range.index + 1, 'math', true, Quill.sources.USER);
    quill.setSelection(range.index + 2, Quill.sources.SILENT);
});