function replaceText() {
    var oldword = document.getElementById('old_word').value
    var newword = document.getElementById('new_word').value

    var bibletext = document.getElementById('bible_text').innerHTML
    var re = new RegExp(oldword, 'g');
    bibletext = bibletext.replace(re, newword)
    document.getElementById('bible_text').innerHTML = bibletext
}

function click_button(event) {
    if (event.keyCode === 13) {
        document.getElementById('enter_button').click();
    }
}