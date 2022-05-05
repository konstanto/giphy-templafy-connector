import express from 'express';
import fetch from 'node-fetch';
import bodyParser from 'body-parser';

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));

var PORT = process.env.PORT || 3000;

app.post('/oauth/token', function(req, res) {
    const response = {
        access_token: req.body.client_secret
    }

    res.send(response);
});

app.get('/content/:id/download-url', async function(req, res) {
    const apiKey = req.headers.authorization.replace("Bearer ", "");
    const request = await fetch(`https://api.giphy.com/v1/gifs/${req.params.id}?api_key=${apiKey}`);
    var result = await request.json()
    const url = { downloadUrl: result.data.images.original.url };
    res.send(url);
});

app.get('/content/', async function(req, res) {
    try {
        var request;
        const apiKey = req.headers.authorization.replace("Bearer ", "");
        var limit = 30;
        if (req.query.search != null) {
            request = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&limit=${limit}&offset=${req.query.skip}&rating=g&q=${req.query.search}`);
        } else {
            request = await fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=${limit}&offset=${req.query.skip}&rating=g`);
        }

        var results = await request.json()

        const response = {
            contentCount: results.pagination.total_count,
            offset: results.pagination.offset,
            content: results.data.map(dataPoint => {
                return {
                    id: dataPoint.id,
                    mimeType: "image/gif",
                    previewUrl: dataPoint.images.preview_gif.url,
                    name: dataPoint.title,
                    tags: `${dataPoint.username} - Giphy`
                }
            })
        }

        res.send(response);

    } catch (error) {
        console.log(error);
    }
});

app.get('/', function(req, res) {
    res.sendStatus(200);
});

app.listen(PORT, function() {
    console.log('Server is running on PORT:', PORT);
});