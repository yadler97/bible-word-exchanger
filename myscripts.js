function replaceText() {
    const oldword = document.getElementById('old_word').value;
    const newword = document.getElementById('new_word').value;

    let bibletext = document.getElementById('bible_text').innerHTML;
    const re = new RegExp(oldword, 'g');
    bibletext = bibletext.replace(re, newword);
    document.getElementById('bible_text').innerHTML = bibletext;
}

function clickButton(event) {
    if (event.keyCode === 13) {
        document.getElementById('enter_button').click();
    }
}
