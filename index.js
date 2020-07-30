const express = require('express')
const app = express()
const path = require('path');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const books = [
    'Gen1', 'Gen2', 'Gen3', 'Gen4', 'Gen5', 'Gen6', 'Gen7', 'Gen8', 'Gen9', 'Gen10',
    'Gen11', 'Gen12', 'Gen13', 'Gen14', 'Gen15', 'Gen16', 'Gen17', 'Gen18', 'Gen19', 'Gen20',
    'Gen21', 'Gen22', 'Gen23', 'Gen24', 'Gen25', 'Gen26', 'Gen27', 'Gen28', 'Gen29', 'Gen30',
    'Gen31', 'Gen32', 'Gen33', 'Gen34', 'Gen35', 'Gen36', 'Gen37', 'Gen38', 'Gen39', 'Gen40',
    'Gen41', 'Gen42', 'Gen43', 'Gen44', 'Gen45', 'Gen46', 'Gen47', 'Gen48', 'Gen49', 'Gen50'
]

app.get('/', function (req, res) {
    var book;
    if (req.query.book == null || req.query.book == '' || !books.includes(req.query.book)) {
        res.redirect('?book=Gen1')
    } else {
        book = req.query.book;
        var request = new XMLHttpRequest();
        request.open("GET","https://getbible.net/json?passage=" + book);
        
        request.addEventListener('load', function(event) {
            if (request.status >= 200 && request.status < 300) {
                var bibleText = "";
                var data = JSON.parse(request.responseText.substring(1, request.responseText.length -2));
                for (var key in data.chapter) {
                    bibleText += data.chapter[key]['verse_nr'] + "  " + data.chapter[key]['verse'] + "\n";
                }
                
                res.render('index', {
                    bibleText: bibleText,
                    books: books,
                    book: book
                });
            } else {
                console.warn(request.statusText, request.responseText);
            }
        });
        request.send();
    }
})

app.get('/de', function (req, res) {
    var book;
    if (req.query.book == null || req.query.book == '' || !books.includes(req.query.book)) {
        res.redirect('/de?book=Gen1')
    } else {
        book = req.query.book;
        var request = new XMLHttpRequest();
        request.open("GET","https://getbible.net/json?passage=" + book + "&lang=luther1912");
        
        request.addEventListener('load', function(event) {
            if (request.status >= 200 && request.status < 300) {
                var bibleText = "";
                var data = JSON.parse(request.responseText.substring(1, request.responseText.length -2));
                for (var key in data.chapter) {
                    bibleText += data.chapter[key]['verse_nr'] + "  " + data.chapter[key]['verse'] + "\n";
                }
                
                res.render('index_de', {
                    bibleText: bibleText,
                    books: books,
                    book: book
                });
            } else {
                console.warn(request.statusText, request.responseText);
            }
        });
        request.send();
    }
})

app.get('/myscripts.js', function (req, res) {
    res.sendFile( __dirname + "/" + "myscripts.js" );
})

app.listen(process.env.PORT || 3000, () => console.log('Bible Word Exchanger listening on port 3000!'))