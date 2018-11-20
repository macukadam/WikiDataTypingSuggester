function html() {
    // to get the content of the editor as HTML object
    var htmlContent = quill.container.firstChild.innerHTML;
    console.log(htmlContent);
}
var options = {
    modules: {
        toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            ['image', 'code-block']
        ]
    },
    placeholder: 'Compose an epic...',
    readOnly: false,
    theme: 'snow'
};
var quill = new Quill('#editor', options);

let title = '';
function down() {
    moveDown(".main");
}
function up() {
    moveUp(".texts");
}

