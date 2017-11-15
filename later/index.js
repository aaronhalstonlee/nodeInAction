const express = require('express');
const read = require('node-readability');
const bodyParser = require('body-parser');
const app = express();
const Article = require('./db').Article;

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    '/css/boostrap.css', 
    express.static('node_modules/bootstrap/dist/css/bootstrap.css')
);

app.get('/', (req, res, next) => {
    res.send('Hello and welcome!')
})

app.get('/articles', (req, res, next) => {
    Article.all((err, articles) => {
        if (err) return next(err);
        res.format({
            html: () => {
                res.render('articles.ejs', {articles: articles });
            },
            json: () => {
                res.send(articles);
            }
        });
    }); 
});

app.post('/articles', (req, res, next) => {
    const url = req.body.url;
    read(url, (err, result) => {
        if (err || !result) res.status(500).send('error downloading article');
        Article.create(
            { title: result.title, content: result.content },
            (err, article) => {
                if (err) return next(err);
                res.send('ok');
            }
        );
    });
});

app.get('/articles/:id', (req, res, next) => {
    const id = req.params.id;
    Article.find(id, (err, article) => {
        if (err) return next(err);
        res.send(article);
    });
});

app.delete('/articles/:id', (req, res, next) => {
    const id = req.params.id;
    Article.delete(id, (err) => {
        if (err) return next(err)
        res.send({ message: 'deleted' });
    });
});

app.listen(app.get('port'), () => {
    console.log('app started on port', app.get('port'));
});

module.exports = app;