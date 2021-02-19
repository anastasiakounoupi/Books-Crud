const express = require('express');
const router = express.Router();
const dbconnection = require('../lib/db');

router.get('/', function (req, res, next) {
    const query = "SELECT * FROM books";
    dbconnection.query(query, (err, rows) => {
        if (err) {
            res.render('books', { title: 'Books - ERROR', books: '', message: '' });
        } else {
            console.log(rows);
            res.render('books', { title: 'Books', books: rows, message: req.query.message });
        }
    });
});

router.get('/b/:id', (req, res, next) => {
    const { id } = req.params;
    const query = "SELECT * FROM books WHERE id = ?";
    dbconnection.query(query, [req.params.id], (err, result) => {
        if (err) {
            res.render('books', { title: 'Books - ERROR', books: '', message: '' });
        } else {
            res.render('book', { title: 'Books', books: result, id });
        }
    });
})

router.delete('/b/:id', (req, res, next) => {
    const { id } = req.params;
    const query = 'DELETE FROM books WHERE id= ?';
    dbconnection.query(query, [req.params.id], (err, result) => {
        if (err) {
            res.render('books', { title: 'Books - ERROR', books: '', message: '' });
        } else {
            res.redirect('/books?message=Succesfully deleted!');
        }
    });
})

router.get('/b/edit/:id', (req, res, next) => {
    const { id } = req.params;
    const query = "SELECT * FROM books WHERE id = ?";
    dbconnection.query(query, [req.params.id], (err, result) => {
        if (err) {
            res.render('books', { title: 'Books - ERROR', books: '', message: '' });
        } else {
            res.render('editBook', { title: 'Edit Book', books: result, id });
        }
    });
})

router.patch('/b/edit/:id', (req, res, next) => {
    const { id } = req.params;
    const query = "UPDATE books SET title = ?, author = ? WHERE id = ?"
    dbconnection.query(query, [req.body.title, req.body.author, req.params.id], (err, result) => {
        if (err) {
            res.render('books', { title: 'Books - ERROR', books: '', message: '' });
        } else {
            res.redirect('/books?message=Succesfully updated!');
        }
    });
})


router.get('/add', (req, res, next) => {
    res.render('addBook', { title: 'Add a Book' });
});

router.post('/add', function (req, res, next) {
    const { title, author } = req.body;
    const query = `INSERT INTO cb12ptjs.books (title, author) VALUES ('${title}', '${author}');`
    dbconnection.query(query, (err, result) => {
        if (err) {
            res.render('addBook', { title: 'Books - ERROR inserting Data into DB' });
        } else {
            res.redirect('/books?message=New Book Added!!');
        }
    });
});



module.exports = router;